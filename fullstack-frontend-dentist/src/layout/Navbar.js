import React, { useState } from 'react'
import './Navbar.css';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ModalNewClient } from '../modals/ModalNewClient';
import { ModalNewProcedure } from '../modals/ModalNewProcedure';

const Navbar = () => {

    const location = useLocation();

    const id = location.pathname.split('/procedure/')[1]; // Extract id from the path

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalIsOpen2, setModalIsOpen2] = useState(false);

    const triggerModal = () => {
        setModalIsOpen(true)
    }

    const triggerModal2 = () => {
        setModalIsOpen2(true)
    }

    console.log(id)

    const isProcedurePage = location.pathname.startsWith('/procedure/');
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
                <div className="container-fluid">

                    <Link className="navbar-brand" to='/'>Duda's App</Link>
                    <button className="navbar-toggler" type="button"
                        data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
                <form class="container-fluid justify-content-end">
                    <Link class="btn btn-outline-info me-2" type="button" to='/'>Agenda</Link>
                    <Link class="btn btn-outline-primary me-2" to='/clients'>Pacientes</Link>
                    <Link class="btn btn-outline-primary me-2" type="button" to='/procedures'>Todos Procedimentos</Link>
                    {location.pathname === '/clients' && (
                        <button className="btn btn-outline-success me-2" type="button" onClick={triggerModal}>Novo Paciente</button>
                    )}
                    {(isProcedurePage) && (
                        <button className="btn btn-outline-success me-2" type="button" onClick={triggerModal2}>Novo Procedimento</button>
                    )}
                </form>
            </nav>
            <ModalNewClient isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} />
            {isProcedurePage && (
                <ModalNewProcedure isOpen={modalIsOpen2}
                    onClose={() => setModalIsOpen2(false)}
                    id={id}
                />
            )}
        </div>

    )
}

export default Navbar
