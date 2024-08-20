import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { ArrowBackOutline, ArrowForwardOutline } from 'react-ionicons'
import { ModalCalendar2 } from './ModalCalendar2.css'

Modal.setAppElement('#root');

const customStyles = {

  overlay: {
    zIndex: 30, // Ensures overlay is on top of everything else
  },
  
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '400px', // Set your desired width
    height: '370px', // Set your desired height
    padding: '20px', // Optional padding
  },
};

export const ModalCalendar = ({ isOpen, updateDate, onClose }) => {

  const [date, setDate] = useState(new Date())
  const [dateDay, setDateDay] = useState(1)
 
  const currentYear = date.toLocaleString('default', { year: 'numeric' });
  const currentMonth = date.toLocaleString('default', { month: 'long' })
  const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const number = 1;

  const handleCalculate = () => {
    const result = number + 1;
    updateDate(result)
    onClose()
  }

  const decrementMonth = () => {
    const newDate = new Date(date); // Create a new Date object based on current state date
    newDate.setMonth(date.getMonth() - 1); // Increase the month by 1
    setDate(newDate); // Update state with the new date
  }

  const incrementMonth = () => {
    const newDate = new Date(date); // Create a new Date object based on current state date
  newDate.setMonth(date.getMonth() + 1); // Increase the month by 1
  setDate(newDate); // Update state with the new date

  }

  const setNewDay = (day) => {
    console.log(day)
    const date2 = new Date(date)
    date2.setDate(day)
    setDate(date2)
  }

  const applyDate = () => {
    updateDate(date)
    onClose()
  }


  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>

      <div className='MainDiv3'>
        <div className='months'>
          <button className='button' onClick={decrementMonth}>
            <ArrowBackOutline
              color={'#00000'}
              height="20px"
              width="20px"
            />
          </button>
          {currentMonth} {currentYear}
          <button className='button' onClick={incrementMonth}>
            <ArrowForwardOutline
              color={'#00000'}
              height="20px"
              width="20px"
            />
          </button>
        </div>

        <div className='days'>
          {Array.from({ length: daysInMonth }, (_, index) => index + 1).map(day => {
            const isCurrentDay = day === date.getDate();
            return (
              <div key={day} className={`day-box ${isCurrentDay ? 'current-day' : ''}`} onClick={() => setNewDay(day)}>
                {day}
              </div>
            );
          })}
        </div>
        <div className='buttons3'>
          <button onClick={applyDate} className='button3-1'>Apply</button>
          <button type='button' onClick={onClose} className='button3-2'>Cancel</button>
        </div>
      </div>
    </Modal>
  )
}
