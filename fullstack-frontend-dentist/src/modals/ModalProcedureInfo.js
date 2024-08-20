import React from 'react'
import Modal from 'react-modal';


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
  },
};

export const ModalProcedureInfo = ({ procedure, onClose, isOpen }) => {
  if (!isOpen || !procedure) {
    return null; // Render nothing if modal is not open or procedure is not set
  }
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      <h2>Informação do procedimento</h2>
      <div>
        <div>
          <h3>Procedimento: </h3>
          <p>{procedure.procedure}</p>
        </div>
        <div>
          <h3>Data: </h3>
          <p>{procedure.date}</p>
        </div>
        <div>
          <h3>Valor: </h3>
          <p>{procedure.value}</p>
        </div>
        <div>
          <h3>Tratamento realizado: </h3>
        </div>
        <button>Detalhes</button>
        <button onClick={onClose}>close</button>
      </div>

    </Modal>
  )
}
