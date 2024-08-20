import axios from 'axios';
import React, { useState } from 'react';
import Modal from 'react-modal';
import { ModalNewClient2 } from './ModalNewClient2.css'
import { ModalNewProcedure } from './ModalNewProcedure';

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
    height: '300px', // Set your desired height
    padding: '20px', // Optional padding
  },
};

export const ModalNewClient = ({ isOpen, onClose, onSubmit }) => {

  const [error, setError] = useState("");

  const [error2, setError2] = useState("");

  const [modalIsOpen2, setModalIsOpen2] = useState(false)

  const [id, setId] = useState(null)

  const [client, setClient] = useState({
    name: "",
    email: "",
    procedures: []
  })

  const { name, email } = client

  const onInputChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value })
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (client.name.length < 1 || client.email.length < 1) {
        setError2("Empty Value")
      } else {
        const response = await axios.post("http://localhost:8080/client", client)
        const savedClient = response.data
        setModalIsOpen2(true)
        setId(savedClient.id)
      }
    } catch (error) {
      if (error.response && error.response.status == 409) {
        setError(error.response.data);
      } else {
        setError("Unexpected error")
      }
    }
  }

  const onCloseFinal = () => {
    setModalIsOpen2(false)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      <h2>Novo Paciente</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          Name:
          <input
            type={"text"}
            className='form-control'
            placeholder='Nome do Paciente'
            name='name'
            value={name}
            onChange={(e) => onInputChange(e)}
          />
          {error2 && <div className='text-danger'>{error2}</div>}
        </label>
        <br />
        <label>
          Email:
          <input
            type={"text"}
            className='form-control'
            placeholder='Email do Paciente'
            name='email'
            value={email}
            onChange={(e) => onInputChange(e)}
          />
          {error2 && <div className='text-danger'>{error2}</div>}
          {error && <div className='text-danger'>{error}</div>}
        </label>
        <br />
        <div className='ModalButtons'>
          <button type='submit'>Add Client</button>
          <button type='button' onClick={onClose}>Cancel</button>
        </div>
      </form>
      <ModalNewProcedure isOpen={modalIsOpen2}
                    onClose={onCloseFinal}
                    id={id}
                />
    </Modal>
  )
}
