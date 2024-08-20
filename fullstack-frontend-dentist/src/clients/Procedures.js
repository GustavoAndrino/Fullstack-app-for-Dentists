import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ArrowDownOutline, ArrowUpOutline } from 'react-ionicons'
import { ModalDeleteProcedure } from '../modals/ModalDeleteProcedure';
import { ModalUpdateProcedure } from '../modals/ModalUpdateProcedure';


export const Procedures = () => {

  var sum = 0;

  const [procedures, setProcedures] = useState([]);
  const [direction, setDirection] = useState("DESC")
  const [sort, setSort] = useState("date")
  const [isOpen, setIsOpen] = useState(false)
  const [isOpen2, setIsOpen2] = useState(false)
  const [id, setId] = useState("")

  useEffect(() => {
    loadProcedures();
  }, [sort, direction]) //se pa tirar o delete procedure

  const loadProcedures = async () => {
    const result = await axios.get(`http://localhost:8080/procedure?sortBy=${sort}&direction=${direction}`)
    setProcedures(result.data)
  }

  const deleteProcedure = async (id) => {
    await axios.delete(`http://localhost:8080/procedure/del/${id}`)
    onClose()
    loadProcedures()
  }
  procedures.forEach((proc) => {
    sum += proc.value;
  });

  const changeDirection = (columnName) => {
    const newDirection = direction === "DESC" ? "ASC" : "DESC";
    setDirection(newDirection)
    setSort(columnName)
  }

  const openModal = (id2) => {
    setId(id2)
    setIsOpen(true)
    console.log(id2)
  }

  const openModal2 = (id2) => {
    setId(id2)
    setIsOpen2(true)
    console.log(id2)
  }

  const onClose = () => {
    setIsOpen(false)
    setIsOpen2(false)
    loadProcedures()
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
              {(direction === "ASC" && sort === "date") && <ArrowDownOutline
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
            <th scope="col">Ação</th>
          </tr>
        </thead>
        <tbody>
          {
            procedures.map((proc, index) => (
              <tr key={proc.id}>
                <th scope='row' key={index}>{index + 1}</th>
                <td>{proc.clientName}</td>
                <td>{proc.procedure}</td>
                <td>{proc.date}</td>
                <td>{proc.value}</td>
                <td>
                  <button class="btn btn-outline-warning me-2" type="button" onClick={() => openModal2(proc.id)}>Edit</button>
                  <button class="btn btn-outline-danger me-2" type="button" onClick={() => openModal(proc.id)}>
                    Delete
                  </button>
                </td>
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

      <ModalDeleteProcedure isOpen={isOpen} onClose={onClose} id={id} deleteProcedure={deleteProcedure} />
      <ModalUpdateProcedure isOpen={isOpen2} onClose={onClose} id={id} />
    </div>
  )
}
