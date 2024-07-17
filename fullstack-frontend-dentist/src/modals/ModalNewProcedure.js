import axios from 'axios';
import React, { useState } from 'react';
import Modal from 'react-modal';
import { ModalNewProcedure2 } from './ModalNewClient2.css';
import { useNavigate } from 'react-router-dom';
import { reloadProcedure } from '../clients/Procedure'; // Import the function

Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '400px', // Set your desired width
    height: '400px', // Set your desired height
    padding: '20px', // Optional padding
  },
};

export const ModalNewProcedure = ({ isOpen, onClose, id, onAddProcedure}) => {

  const navigate = useNavigate();

  const [error, setError] = useState("");

  const [error2, setError2] = useState("");

  const [procedure2, setProcedure] = useState({
    procedure: "",
    date: "",
    value: ""
  })

  const { procedure, date, value } = procedure2

  const onInputChange = (e) => {
    setProcedure({ ...procedure2, [e.target.name]: e.target.value })
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (procedure2.procedure.length < 1 || procedure2.date.length < 1) {
        setError2("Empty Value")
      } else {
        await axios.put(`http://localhost:8080/client/procedures/${id}`, procedure2)
        onClose();
      }
    } catch (error) {
      if (error.response && error.response.status == 409) {
        setError(error.response.data);
      } else {
        setError("Unexpected error")
      }
    }
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      <h2>Novo Procedimento</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          Nome do procedimento:
          <input
            type={"text"}
            className='form-control'
            placeholder='Nome do Procedimento'
            name='procedure'
            value={procedure}
            onChange={(e) => onInputChange(e)}
          />
          {error2 && <div className='text-danger'>{error2}</div>}
        </label>
        <br />
        <label>
          Data e hora:
          <input
            type={"text"}
            className='form-control'
            placeholder='dd/MM/aaaa HH:mm'
            name='date'
            value={date}
            onChange={(e) => onInputChange(e)}
          />
          {error2 && <div className='text-danger'>{error2}</div>}
          {error && <div className='text-danger'>{error}</div>}
        </label>
        <br />
        <label>
          Valor:
          <input
            type={"text"}
            className='form-control'
            placeholder='$$$$$'
            name='value'
            value={value}
            onChange={(e) => onInputChange(e)}
          />
          {error2 && <div className='text-danger'>{error2}</div>}
          {error && <div className='text-danger'>{error}</div>}
        </label>
        <br />
        <div className='ModalButtons'>
          <button type='submit'>Adicionar Procedimento</button>
          <button type='button' onClick={onClose}>Cancelar</button>
        </div>
      </form>
    </Modal>
  )
}
