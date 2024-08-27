// Agenda.jsx
import React, { useEffect, useState } from 'react';
import './Agenda.css';
import axios from 'axios';
import { ArrowBackOutline, ArrowForwardOutline } from 'react-ionicons'
import { Link } from 'react-router-dom';
import { ModalProcedureInfo } from '../modals/ModalProcedureInfo';
import { ModalCalendar } from '../modals/ModalCalendar';
import { ModalButtons } from '../modals/ModalButtons';
import { ModalNewClient } from '../modals/ModalNewClient';


const Agenda = ({ days, hours }) => {
  const today = new Date();

  const [date, setDate] = useState(new Date());
  const [semana, setSemana] = useState([]);
  const [year, setYear] = useState()
  const [procedures, setProcedures] = useState([]);

  const [dayForModal, setDayForModal] = useState('')
  const [hourForModal, setHourForModal] = useState('')
  const [hourPlus, setHourPlus] = useState('')

  const [selectedProcedure, setSelectedProceudre] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [modalOpen3, setModalOpen3] = useState(false)
  const [modalClientOpen, setModalClientOpen] = useState(false)

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

  const updateDate = (date) => { //Updates the date used by the agenda to 
    setDate(date)                //search for procedures based on the modal date choice
  }

  const openModal = (procedure) => {
    setSelectedProceudre(procedure)
    setModalOpen(true)
  }

  const openModal2 = () => {
    setModalOpen2(true)
  }

  const openModal3 = (day, hour) => {
    const finalDay = day +'/' + year
    setDayForModal(finalDay)
    setHourForModal(hour)

    console.log(hour)

    const [hour1, minute1] = hour.split(':')
    const hourPlus = Number(hour1) + 1

    const hourFinal = hourPlus + ':' + minute1
    setHourPlus(hourFinal)

    setModalOpen3(true)
  }

  const close = () => {
    setModalOpen2(false)
  }

  const close2 = () => {
    setModalOpen3(false)
  }

  const close3 = () => {
    setModalOpen(false)
    updateCalendar2()
  }

  const updateCalendar2 = () => {
    console.log("fixed")
    loadProcedures()
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
    setYear(inicioSemana.getFullYear())
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
    const date2 = day + '/' + year
    const [day1, hour1] = date.split(' ')

    const firstHour = formatDate(hour1)
    const secondHour = formatDate(hour)
    const thirdHour = secondHour + 100
    
    return firstHour >= secondHour && firstHour < thirdHour && day1 === date2
  }

  const formatDate = (hour) => {

    const [hour1, minute] = hour.split(":")
    const numberString = hour1 + minute
    const result = Number(numberString)

    return result
  }

  const getTopPosition = (date) => {
    const [date1, time] = date.split(' ')
    const [hour, minute] = time.split(':').map(Number)

    return minute;
  }

  const getHeight = (endDate, date) => {
    const start = parseDate(date);
    const end = parseDate(endDate);

    const difference = end.getTime() - start.getTime();
    const result = difference / (1000 * 60); // Convert milliseconds to minutes
    return result;
  }

  const parseDate = (dateString) => {
    const [datePart, timePart] = dateString.split(' ');
    const [day, month, year] = datePart.split('/').map(Number);
    const [hours, minutes] = timePart.split(':').map(Number);

    return new Date(year, month - 1, day, hours, minutes);
  }

  const finalDate = (startDate, endDate) => {
    const [x, startHour] = startDate.split(' ')
    const [y, endHour] = endDate.split(' ')

    const result = `${startHour} - ${endHour}`

    return result;
  }

  const openModalNewClient = () => {
    setModalClientOpen(true)
    close2()
  }

  const onCloseModalClient = () => {
    setModalClientOpen(false)
    loadProcedures()
  }

  const checkBackgroundColor = (id) => {
    console.log(id)
    if(id === 'Não Marcar'){
      return 'rgb(200, 200, 0)'
      
    } else{
      return 'rgb(153, 186, 155)'
    }
  }

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
              <nav className='clickMe' onClick={openModal2}>
                {formattedDate}
              </nav>
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
              <th scope="row" className='center'>{hour}</th>
              {days.map((day, index) => (
                <td key={`${day}-${hour}`} className='finalTest' onClick={() => openModal3(semana[index], hour)}>
                  {procedures.map(proc => (
                    (checkProcedureDate(proc.date, semana[index], hour)) && (
                      <div className='finalTest2'
                      onClick={(e) => {
                        e.stopPropagation(); // Prevents the click event from propagating to parent elements
                        openModal(proc); // Calls the function to open the modal
                      }}
                        style={{
                          top: `${getTopPosition(proc.date)}px`,
                          height: `${getHeight(proc.endDate, proc.date)}px`,
                          backgroundColor:`${checkBackgroundColor(proc.clientName)}`                         
                        }}
                      >
                        {`${proc.clientName}`}<br />{finalDate(proc.date, proc.endDate)}
                      </div>
                    )
                  ))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <ModalButtons isOpen={modalOpen3} clientModal={openModalNewClient} 
      updateCalendar={updateCalendar2} onClose={close2} 
      clickedDay={dayForModal} clickedHour={hourForModal}
      clickedHourPlus={hourPlus}/>
      <ModalProcedureInfo procedureOld={selectedProcedure} isOpen={modalOpen} onClose={close3} />
      <ModalCalendar isOpen={modalOpen2} onClose={close} updateDate={updateDate} />
      <ModalNewClient isOpen={modalClientOpen} onClose={onCloseModalClient} />

    </div>
  );
};


export default Agenda;
