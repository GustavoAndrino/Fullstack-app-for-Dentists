import React from 'react'
import Modal from 'react-modal'

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
        height: '170px', // Set your desired height
        padding: '20px', // Optional padding
    },
};

export const ModalDeleteProcedure = ({ isOpen, onClose, id, deleteProcedure }) => {
    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
            <div>
                <div className='MainDiv3'>
                    Você tem certeza de que quer deletar o procedimento de id = {id} ?
                </div>
                <div className='buttons3'>
                    <button onClick={() => deleteProcedure(id)} className='button3-1'>Sim</button>
                    <button onClick={onClose} className='button3-2'>Não</button>
                </div>
            </div>
        </Modal>
    )
}
