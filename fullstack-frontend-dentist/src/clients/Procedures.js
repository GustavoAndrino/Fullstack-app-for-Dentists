import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ArrowDownOutline, ArrowUpOutline } from 'react-ionicons'


export const Procedures = () => {

  var sum = 0;

  const [procedures, setProcedures] = useState([]);
  const [direction, setDirection] = useState("DESC")
  const [sort, setSort] = useState("date")

  useEffect(()=>{
    loadProcedures();
  }, [sort, direction])

  const loadProcedures = async() => {
    const result = await axios.get(`http://localhost:8080/procedure?sortBy=${sort}&direction=${direction}`)
    setProcedures(result.data)
  }
  procedures.map((proc) =>{
    sum = sum + proc.value
  })

  const changeDirection = (columnName) => {
    const newDirection = direction === "DESC" ? "ASC" : "DESC";
    setDirection(newDirection)
    setSort(columnName)
  }

  return (
    <div>

<h1 className=''>Todos Procedimentos</h1>
<table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col" onClick={() => changeDirection("clientName")}>Nome do Paciente
      {(direction === "ASC" && sort === "clientName") && <ArrowDownOutline
                color={'#00000'}
                height="20px"
                width="20px"
              />}
              {(direction === "DESC" && sort === "clientName") && <ArrowUpOutline
                color={'#00000'}
                height="20px"
                width="20px"
              />}
      </th>
      <th scope="col" onClick={() => changeDirection("procedureName")}>Nome do Procedimento
      {(direction === "ASC" && sort === "procedureName") && <ArrowDownOutline
                color={'#00000'}
                height="20px"
                width="20px"
              />}
              {(direction === "DESC" && sort === "procedureName") && <ArrowUpOutline
                color={'#00000'}
                height="20px"
                width="20px"
              />}
      </th>
      <th scope="col" onClick={() => changeDirection("date")}>Data do Procedimento
      {(direction === "ASC" && sort === "date") &&  <ArrowDownOutline
                color={'#00000'}
                height="20px"
                width="20px"
              />}
              {(direction === "DESC" && sort === "date") && <ArrowUpOutline
                color={'#00000'}
                height="20px"
                width="20px"
              />}
      </th>
      <th scope="col" onClick={() => changeDirection("value")}>Valor do Procedimento
      {(direction === "ASC" && sort === "value") && <ArrowDownOutline
                color={'#00000'}
                height="20px"
                width="20px"
              />}
              {(direction === "DESC" && sort === "value") && <ArrowUpOutline
                color={'#00000'}
                height="20px"
                width="20px"
              />}
      </th>
    </tr>
  </thead>
  <tbody>
    { 
      procedures.map((proc, index) => (
        <tr>
          <th scope='row' key={index}>{index + 1}</th>
          <td>{proc.clientName}</td>
          <td>{proc.procedure}</td>
          <td>{proc.date}</td>
          <td>{proc.value}</td>
        </tr>
      ))
    }
    <tr>
      <th scope='row'>Total sum</th>
      <td></td>
      <td></td>
      <td>${sum}.00</td>
    </tr>
  </tbody>
</table>
    </div>
  )
}
