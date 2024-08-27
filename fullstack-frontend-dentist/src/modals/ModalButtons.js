import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { ArrowBackOutline, ArrowForwardOutline } from 'react-ionicons'
import { ModalCalendar2 } from './ModalCalendar2.css'
import axios from 'axios';
import { ModalNewClient } from './ModalNewClient';
import { ModalNewProcedure } from './ModalNewProcedure';
import './ModalButtons2.css';

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
        backgroundColor: 'rgb(153, 186, 155, 85%)',
        overflow: 'auto',
        boxShadow: '2px 2px 10px 1px rgba(0, 0, 0, 0.2)',
        border: 'solid 2px rgba(0, 0, 0, 0.2)'
    },
};

export const ModalButtons = ({ isOpen, updateCalendar, onClose, clickedDay, clickedHour, clickedHourPlus, clientModal }) => {

    const [clients, setClients] = useState([]);
    const [pacienteExistente, setPacienteExistente] = useState(false)
    const [nMarcar, setNMarcar] = useState(false)
    const [visibility, setVisibility] = useState(true)
    const [dropdownVisible, setDropdownVisible] = useState(false)
    const [name, setName] = useState("")
    const [day, setDay] = useState(clickedDay)
    const [startHour, setStartHour] = useState(clickedHour)
    const [endHour, setEndHour] = useState(clickedHourPlus)
    const [id, setId] = useState()
    const [isOpen2, setIsOpen] = useState(false)
    const [error, setError] = useState('')

    const [procedure2, setProcedure] = useState({
        procedure: "Não Marcar",
        date: "",
        endDate: "",
        value: "1"
    })

    useEffect(() => {
        loadClients();
    }, [name])


    const loadClients = async () => {
        const result = await axios.get(`http://localhost:8080/client?sortBy=name&direction=DESC&name=${name}`);
        setClients(result.data);
    }

    const Close = () => {
        updateCalendar()
        setIsOpen(false)
        setVisibility(true)
        setPacienteExistente(false)
        setNMarcar(false)
        onClose()
    }

    const pacienteTrue = () => {
        setVisibility(false)
        setPacienteExistente(true)
    }

    const nMarcarTrue = () => {
        setDay(clickedDay)
        setStartHour(clickedHour)
        setEndHour(clickedHourPlus)
        setVisibility(false)
        setNMarcar(true)
    }

    const buttonPage = () => {
        setDay(clickedDay)
        setStartHour(clickedHour)
        setEndHour(clickedHourPlus)
        setNMarcar(false)
        setPacienteExistente(false)
        setVisibility(true)
    }

    const onInputChange = (e) => {
        setName(e.target.value)
    }

    const validateMinute = (minute) => {
        if (minute > 59) return '59';
        return minute;
    }

    const validateHour = (hour) => {
        if (hour > 23) return '23';
        return hour;
    }

    const validateDay = (day) => {
        if (day > 31) return '31';
        return day;
    };

    const validateMonth = (month) => {
        if (month > 12) return '12';
        return month;
    };

    const formatDate = (value) => {
        // Remove non-numeric characters
        const numbers = value.replace(/\D/g, '');
        let formatted = '';

        if (numbers.length <= 2) {
            formatted = validateDay(numbers);
        } else if (numbers.length <= 4) {
            const dayPart = validateDay(numbers.substring(0, 2));
            const monthPart = validateMonth(numbers.substring(2));
            formatted = `${dayPart}/${monthPart}`;
        } else {
            const dayPart = validateDay(numbers.substring(0, 2));
            const monthPart = validateMonth(numbers.substring(2, 4));
            const yearPart = numbers.substring(4, 8);
            formatted = `${dayPart}/${monthPart}/${yearPart}`;
        }

        return formatted;
    };

    const onInputChange2 = (e) => {
        const value = e.target.value;
        const formattedValue = formatDate(value);
        setDay(formattedValue);
    };

    const onInputChange3 = (e) => {
        setStartHour(e.target.value)

        const [hour1, minute1] = startHour.split(':')
        const hourMinute1 = Number(hour1 + minute1)

        const [hour2, minute2] = endHour.split(':')
        const hourMinute2 = Number(hour2 + minute2) //add this logic to apply 

    }

    const onInputChange4 = (e) => {
        setEndHour(e.target.value)
    }

    const onClientSelect = (clientName, id) => {
        setName(clientName);
        setId(id);
        setDropdownVisible(false);
    };

    const handleBlur = () => {
        // Timeout to allow click event on dropdown item to be processed
        setTimeout(() => setDropdownVisible(false), 100);
    };

    const clientModalFunction = () => {
        clientModal()
    }

    const openModal = () => {
        setIsOpen(true)
    }

    const naoMarcar = async (e) => {

        const date = day + ' ' + startHour
        const endDate2 = day + ' ' + endHour
        console.log(date, endDate2)
        setProcedure({
            procedure: "Não Marcar",
            date: date,  // Assuming startDate is defined and contains the value you want
            endDate: endDate2, // Set endDate to endHour
            value: "1"
        });

        console.log(day, startHour, endHour)

        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/client/procedures/602`, {
                procedure: "Não Marcar",
                date: date,
                endDate: endDate2,
                value: "1"
            });
            setVisibility(true)
            setNMarcar(false)
            Close();
        }
        catch (error) {
            if (error.response && error.response.status == 409) {
                setError(error.response.data);
            } else {
                setError("Unexpected error")
            }
        }
    }


    return (
        <Modal isOpen={isOpen} onRequestClose={Close} style={customStyles}>
            {visibility && (
                <div className='MainDiv4'>
                    <button onClick={clientModalFunction}>Novo Paciente</button>
                    <button onClick={pacienteTrue}>Paciente existente</button>
                    <button onClick={nMarcarTrue}>Não marcar</button>
                    <button onClick={onClose}>Cancelar</button>


                </div>
            )}

            {pacienteExistente && (
                <div>
                    <input
                        type={"text"}
                        className='search-bar'
                        placeholder='Nome do Paciente'
                        name='name'
                        value={name}
                        onChange={(e) => onInputChange(e)}
                        onBlur={handleBlur}
                        onFocus={() => setDropdownVisible(true)}
                    />
                    <button onClick={buttonPage}>Voltar</button>
                    <button onClick={openModal}>Apply</button>
                    {dropdownVisible && (
                        <ul className='dropdown-list'>
                            {clients.map(client => (
                                <li key={client.id} onClick={() => onClientSelect(client.name, client.id)}>
                                    {client.name}
                                </li>
                            ))}
                        </ul>
                    )}


                </div>
            )}

            {nMarcar && (
                <div className='nao-marcar'>
                    <div>Data:</div>
                    <input
                        type={"text"}
                        className='days-hours'
                        placeholder='Dia'
                        name='day'
                        value={day}
                        onChange={(e) => onInputChange2(e)}
                    />
                    <div>Hora de início:</div>
                    <input
                        type={"text"}
                        className='days-hours'
                        placeholder='Hora de começo'
                        name='startHour'
                        value={startHour}
                        onChange={(e) => onInputChange3(e)}
                    />
                    <div>Hora de término:</div>
                    <input
                        type={"text"}
                        className='days-hours'
                        placeholder='Hora término'
                        name='endHour'
                        value={endHour}
                        onChange={(e) => onInputChange4(e)}
                    />
                    {error && <div className='text-danger'>{error}</div>}
                    <p></p>

                    <button onClick={buttonPage}>Voltar</button>
                    <button onClick={naoMarcar}>Apply</button>
                </div>
            )}

            <ModalNewProcedure isOpen={isOpen2} onClose={Close} id={id} />
        </Modal>
    )
}
