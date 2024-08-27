import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ArrowDownOutline, ArrowUpOutline } from 'react-ionicons'
import { ModalDeleteProcedure } from '../modals/ModalDeleteProcedure';
import { ModalUpdateProcedure } from '../modals/ModalUpdateProcedure';
import { format } from 'date-fns';
import { ModalCalendar } from '../modals/ModalCalendar';


export const Procedures = () => {

  var sum = 0;

  const currentDate = new Date(); // Get the current date
  
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  const formattedDate = format(firstDayOfMonth, 'dd/MM/yyyy');
  const formattedDate2 = format(lastDayOfMonth, 'dd/MM/yyyy');


  const [procedures, setProcedures] = useState([]);
  const [direction, setDirection] = useState("ASC")
  const [sort, setSort] = useState("date")
  const [isOpen, setIsOpen] = useState(false)
  const [isOpen2, setIsOpen2] = useState(false)
  const [isOpen3, setIsOpen3] = useState(false)
  const [isOpen4, setIsOpen4] = useState(false)
  const [id, setId] = useState("")
  const [endTime, setEndtime] = useState('')
  const [initialDate, setInitialDate] = useState(formattedDate)
  const [finalDate, setFinalDate] = useState(formattedDate2)

  useEffect(() => {
    loadProcedures();
  }, [sort, direction, initialDate, finalDate]) //se pa tirar o delete procedure

  const loadProcedures = async () => {
    const result = await axios.get(`http://localhost:8080/proceduresBetween?date=${initialDate}%2000:00&date2=${finalDate}%2023:59&sortBy=${sort}&direction=${direction}`)
    setProcedures(result.data)
  }

  //http://localhost:8080/proceduresBetween?date=${incialDate}&date2=${finalDate}&sortBy=${sort}&direction=${direction}

  const getEndTime = (endDate) => {
    const [day, time] = endDate.split(' ')
    return time
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

  const openModal3 = () => {
    setIsOpen3(true)
  }

  const openModal4 = () => {
    setIsOpen3(true)
  }

  const onClose = () => {
    setIsOpen(false)
    setIsOpen2(false)
    loadProcedures()
  }

  const updateDate = (date) => {
    const formattedDate = format(date, 'dd/MM/yyyy');
    setInitialDate(formattedDate)
  }

  const updateDate2 = (date) => {
    const formattedDate = format(date, 'dd/MM/yyyy');
    setFinalDate(formattedDate)
  }

  const close = () => {
    setIsOpen3(false)
    setIsOpen4(false)
    //loadProcedures()   é necessário ? 
  }

  return (
    <div>

      <h1 className=''>Todos Procedimentos</h1>
      <div className='center'>
        <div className='makeMePretty' onClick={openModal3}>{initialDate}</div>
        <div>&nbsp;-&nbsp;</div>
        <div className='makeMePretty' onClick={openModal4}>{finalDate}</div>
      </div>
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
                <td>{proc.date} -- {getEndTime(proc.endDate)} </td>
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
      <ModalCalendar isOpen={isOpen3} onClose={close} updateDate={updateDate} />
      <ModalCalendar isOpen={isOpen4} onClose={close} updateDate={updateDate2} />
    </div>
  )
}
