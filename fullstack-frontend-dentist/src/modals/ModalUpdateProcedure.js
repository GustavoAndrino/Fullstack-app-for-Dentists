import axios from 'axios';
import React, { useEffect, useState } from 'react'
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
        height: '350px', // Set your desired height
        padding: '20px', // Optional padding
    },
};

export const ModalUpdateProcedure = ({ isOpen, onClose, id, }) => {

    const [error, setError] = useState("");

    const [error2, setError2] = useState("");

    const [procedure2, setProcedure] = useState({})

    const { procedure, date, value } = procedure2

    useEffect(() => {
        if (id) {
            loadProcedure(id);
        }
    }, [id]);

    useEffect(() => {
        console.log("Procedure2 object updated:", procedure2);
    }, [procedure2]);


    const loadProcedure = async (id) => {
        const result = await axios.get(`http://localhost:8080/procedure/byId/${id}`)
        setProcedure(result.data)
        console.log("done")
    }

    const onInputChange = (e) => {
        setProcedure({ ...procedure2, [e.target.name]: e.target.value })
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            if (procedure2.procedure.length < 1 || procedure2.date.length < 1) {
                setError2("Empty Value")
            } else {
                console.log("Submitting with id:", id);
                const payload = {
                    procedure: procedure,
                    date: date,
                    value: value
                };
                await axios.put(`http://localhost:8080/procedure/update/${id}`, payload)
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
            <h2>Atualizar Procedimento</h2>
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
                    <button type='submit'>Modificar Procedimento</button>
                    <button type='button' onClick={onClose}>Cancelar</button>
                </div>
            </form>

        </Modal>
    )
}
