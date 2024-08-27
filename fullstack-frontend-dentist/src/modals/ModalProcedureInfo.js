import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import './ModalProcedureInfo2.css';
import axios from 'axios';
import { ModalDeleteProcedure } from './ModalDeleteProcedure';


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
    width: '600px', // Set your desired width
    height: '500px', // Set your desired height
    padding: '20px', // Optional padding
    backgroundColor: 'rgb(153, 186, 155, 85%)',
    overflow: 'auto',
    boxShadow: '2px 2px 10px 1px rgba(0, 0, 0, 0.2)',
    border: 'solid 2px rgba(0, 0, 0, 0.2)'
  },
};

export const ModalProcedureInfo = ({ procedureOld, onClose, isOpen }) => {

  const [inform, setInfo] = useState(true)
  const [details, setDetails] = useState(false)
  const [update, setUpdate] = useState(1)
  const [isReadOnly, setIsReadOnly] = useState(true)
  const [endTime, setEndTime] = useState('')
  const [startTime, setStartTime] = useState('')
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [procedureFinal, setProcedureFinal] = useState({
    procedure: '',
    date: '',
    endDate: '',
    value: '',
    info: ''
  });

  useEffect(() => {
    if (isOpen && procedureOld) {
      setProcedureFinal({
        procedure: procedureOld.procedure || '',
        date: procedureOld.date || '',
        endDate: procedureOld.endDate || '',
        value: procedureOld.value || '',
        info: procedureOld.info || ''
      });
    }
  }, [isOpen, procedureOld, update]);

  const { procedure, date, endDate, value, info } = procedureFinal;

  const onInputChange = (e) => {
    setProcedureFinal({ ...procedureFinal, [e.target.name]: e.target.value })
  }

  if (!isOpen || !procedureOld) {
    return null; // Render nothing if modal is not open or procedure is not set
  }

  const turnDetailsOn = () => {
    setInfo(false)
    setDetails(true)
    console.log(update)
  }

  const turnInfoOn = () => {
    setInfo(true)
    setDetails(false)
    setUpdate(update + 1)
    setIsReadOnly(true)
    console.log(update)
  }

  const toggleReadOnly = () => {
    setIsReadOnly(!isReadOnly);
  };

  const closeMe = () => {
    setInfo(true)
    setDetails(false)
    setUpdate(update + 1)
    setIsReadOnly(true)
    setIsModalOpen(false)
    onClose()
    console.log(update)
  }

  const modalClose = () => {
    setIsModalOpen(false)
  }

  const textAreaSize = () => {
    return (Math.floor(info.length/71) * 60)/2
  }

  const deleteProcedure = async (id) => {
    await axios.delete(`http://localhost:8080/procedure/del/${procedureOld.id}`)
    closeMe()
  }

  const submitChanges = async (e) => {
    e.preventDefault();
    try {
        if (procedureFinal.procedure.length < 1 || procedureFinal.date.length < 1) {
            console.log("error")
        } else {
            console.log("Submitting with id:", procedureOld.id);
            const payload = {
                procedure: procedure,
                date: date,
                endDate: endDate,
                value: value,
                info: info
            };
            await axios.put(`http://localhost:8080/procedure/update/${procedureOld.id}`, payload)
            console.log("Deu bom")
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
    <Modal isOpen={isOpen} onRequestClose={closeMe} style={customStyles}>
      {inform && (
        <div>
          <h2>Informação do procedimento</h2>
          <div>
            <div>
              <h3>Procedimento: </h3>
              <p>{procedureOld.procedure}</p>
            </div>
            <div>
              <h3>Hora de inicio: </h3>
              <p>{procedureOld.date}</p>
            </div>
            <div>
              <h3>Hora de término: </h3>
              <p>{procedureOld.endDate}</p>
            </div>
          </div>
          <button onClick={turnDetailsOn}>Detalhes</button>
          <button onClick={onClose}>close</button>
        </div>

      )}

      {details && (
        <div>
          <h2>Detalhes do procedimento</h2>
          <div>
            <div>
              <h3>Procedimento: </h3>
              <input
                type={"text"}
                className='form-control'
                placeholder='Nome do Procedimento'
                name='procedure'
                value={procedure}
                readOnly={isReadOnly}
                style={{
                  border: isReadOnly ? '0px solid gray' : '2px solid green',
                  backgroundColor: 'rgb(218, 250, 222)',
                  fontFamily:'Courier New, Courier, monospace'
                }}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div>
              <h3>Hora de início: </h3>
              <input
                type={"text"}
                className='form-control'
                placeholder='data'
                name='date'
                value={date}
                readOnly={isReadOnly}
                style={{
                  border: isReadOnly ? '0px solid gray' : '2px solid green',
                  backgroundColor: 'rgb(218, 250, 222)',
                  fontFamily:'Courier New, Courier, monospace'
                }}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div>
              <h3>Hora de término: </h3>
              <input
                type={"text"}
                className='form-control'
                placeholder='data'
                name='endDate'
                value={endDate}
                readOnly={isReadOnly}
                style={{
                  border: isReadOnly ? '0px solid gray' : '2px solid green',
                  backgroundColor: 'rgb(218, 250, 222)',
                  fontFamily:'Courier New, Courier, monospace'
                }}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div>
              <h3>Tratamento realizado: </h3>
              <textarea
                type={"text"}
                className='form-control'
                placeholder='data'
                name='info'
                value={info}
                readOnly={isReadOnly}
                style={{
                  border: isReadOnly ? '0px solid gray' : '2px solid green',
                  height: '100px',
                  textAlign: 'justify',
                  backgroundColor: 'rgb(218, 250, 222)',
                  fontFamily:'Courier New, Courier, monospace'
                }}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div>
              <h3>Orçamento: </h3>
              <input
                type={"text"}
                className='form-control'
                placeholder='data'
                name='value'
                value={value}
                readOnly={isReadOnly}
                style={{
                  border: isReadOnly ? '0px solid gray' : '2px solid green',
                  backgroundColor: 'rgb(218, 250, 222)',
                  fontFamily:'Courier New, Courier, monospace'
                }}
                onChange={(e) => onInputChange(e)}
              />
            </div>
          </div>
          <button onClick={submitChanges}>Aplicar</button>
          <button onClick={toggleReadOnly}>
            {isReadOnly ? 'Edit' : 'View Only'}
          </button>
          <button onClick={() => setIsModalOpen(true)}>Deletar</button>
          <button onClick={turnInfoOn}>voltar</button>

          <ModalDeleteProcedure isOpen={isModalOpen} onClose={modalClose} 
          id={procedureOld.id} deleteProcedure={deleteProcedure} />
        </div>
      )}






    </Modal >
  )
}
