// Agenda.jsx
import React, { useEffect, useState } from 'react';
import './Agenda.css';
import axios from 'axios';
import { ArrowBackOutline, ArrowForwardOutline } from 'react-ionicons'
import { Link } from 'react-router-dom';
import { ModalProcedureInfo } from '../modals/ModalProcedureInfo';


const Agenda = ({ days, hours }) => {
  const today = new Date();

  const [date, setDate] = useState(new Date());
  const [semana, setSemana] = useState([]);
  const [procedures, setProcedures] = useState([]);

  const [selectedProcedure, setSelectedProceudre] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    loadSemana();
    loadProcedures();
  }, [date])

  const incrementDate = () => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1)
    setDate(newDate)
  }

  const decrementDate = () => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - 1)
    setDate(newDate)
  }

  const resetDate = () => {
    const newDate = new Date();
    setDate(newDate);

  }

  const loadProcedures = async () => {
    const result = await axios.get(`http://localhost:8080/proceduresofweek?date=${formattedDate}%2000:00`)
    setProcedures(result.data)
  }

  const openModal = (procedure) => {
    setSelectedProceudre(procedure)
    setModalOpen(true)
  }

  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const formattedDate = date.toLocaleDateString('pt-BR', options);

  const options2 = { month: '2-digit', day: '2-digit' };
  const formattedDate2 = date.toLocaleDateString('pt-BR', options2);

  const loadSemana = () => {
    const formatter = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit' });

    // Calculate the start of the current week (Monday)
    const inicioSemana = new Date(date);
    const dayOfWeek = inicioSemana.getDay();
    const offset = (dayOfWeek === 0) ? -6 : 1 - dayOfWeek; // Adjust for Sunday
    inicioSemana.setDate(inicioSemana.getDate() + offset);

    // Generate the semana array for the current week
    const semanaArray = [];
    for (let i = 0; i < 7; i++) {
      const weekDate = new Date(inicioSemana);
      weekDate.setDate(inicioSemana.getDate() + i);
      semanaArray.push(formatter.format(weekDate));
    }

    setSemana(semanaArray);
  }

  const checkProcedureDate = (date, day, hour) => {
    const dateObj = new Date(date);
    const newDate = day + '/2024 ' + hour //PEGAR ANO ATUAL E NÃO SÓ 2024

    if (newDate == date) {
      return true;
    } else {
      return false;
    }
  }

  procedures.map(proc =>{
    console.log('space')
    console.log(proc.date)
  })

  return (
    <div className="agenda">
      <div className='special-div'>
        <button className='button2' onClick={resetDate}>Reset Agenda</button>
        <h1 className='special-h1'>Agenda da Semana</h1>
      </div>
      <table className="table table-bordered table-custom table-shadow">
        <thead>
          <tr className='pretty'>
            <th className='center'>
              <button className='button' onClick={decrementDate}>
                <ArrowBackOutline
                  color={'#00000'}
                  height="20px"
                  width="20px"
                />
              </button>
              {formattedDate}
              <button className='button' onClick={incrementDate}>
                <ArrowForwardOutline
                  color={'#00000'}
                  height="20px"
                  width="20px"
                />
              </button>
            </th> {/* Empty cell for hour/day headers */}
            {days.map((day, index) => (
              <th key={index}
                className={formattedDate2 === semana[index] ? 'highlight' : ''}>
                {semana[index]}<br />{day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map(hour => (
            <tr key={hour}>
              <th scope="row">{hour}</th>
              {days.map((day, index) => (
                <td key={`${day}-${hour}`} className='finalTest'>
                  {procedures.map(proc => (
                    (checkProcedureDate(proc.date, semana[index], hour)) && (
                      <div className='finalTest2' onClick={() => openModal(proc)}>
                        {proc.clientName}
                      </div>
                    )
                  ))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <ModalProcedureInfo procedure={selectedProcedure} isOpen={modalOpen} onClose={() => setModalOpen(false)} />

    </div>
  );
};


export default Agenda;
