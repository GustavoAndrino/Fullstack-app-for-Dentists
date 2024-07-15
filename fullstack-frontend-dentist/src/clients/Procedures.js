import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const Procedures = () => {

  var sum = 0;

  const [procedures, setProcedures] = useState([]);

  useEffect(()=>{
    loadProcedures();
  }, [])

  const loadProcedures = async() => {
    const result = await axios.get('http://localhost:8080/procedure')
    setProcedures(result.data)
  }
  procedures.map((proc) =>{
    sum = sum + proc.value
  })

  return (
    <div>

<h1 className=''>Todos Procedimentos</h1>
<table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Nome do Paciente</th>
      <th scope="col">Nome do Procedimento</th>
      <th scope="col">Data do Procedimento</th>
      <th scope="col">Valor do Procedimento</th>
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
