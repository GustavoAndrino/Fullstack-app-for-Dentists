// Agenda.jsx
import React, { useEffect, useState } from 'react';
import './Agenda.css';
import axios from 'axios';
import { ArrowBackOutline, ArrowForwardOutline } from 'react-ionicons'


const Agenda = ({ days, hours }) => {
  const today = new Date();

  const [date, setDate] = useState(new Date());
  const [semana, setSemana] = useState([]);

  useEffect(() => {
    loadSemana();
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

  if (formattedDate2 === semana[1]) {
    console.log("equals")
  } else {
    console.log("not equal")
  }

  return (
    <div className="agenda">
      <div className='special-div'>
        <button className='button2' onClick={resetDate}>Reset Agenda</button>
        <h1 className='special-h1'>Agenda da Semana</h1>
      </div>
      <table className="table table-bordered table-custom table-shadow">
        <thead>
          <tr>
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
              {days.map(day => (
                <td key={`${day}-${hour}`}>
                  {/* Render events or placeholders for events */}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};


export default Agenda;
