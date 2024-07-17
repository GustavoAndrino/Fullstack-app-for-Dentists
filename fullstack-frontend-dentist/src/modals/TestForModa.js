import React, { useEffect, useState } from 'react'
import { ModalCalendar } from './ModalCalendar';

export const TestForModa = () => {

    const [aNumber, setANumber] = useState(new Date())

    const string = aNumber.toLocaleDateString()

    const [isOpen, setIsOpen] = useState(false);

    const updateDate = (result) => {
        setANumber(result)
    }

    const close = () => {
        setIsOpen(false)
    }

    const openModal = () => {
        setIsOpen(true);
    }

  return (
    <div>
        <h1>Test for Modal</h1>
        <h2>{string}</h2>
        <button onClick={openModal}>Activate modal</button>
        
        <ModalCalendar isOpen={isOpen} updateDate={updateDate} onClose={close} />
    </div>
  )
}
