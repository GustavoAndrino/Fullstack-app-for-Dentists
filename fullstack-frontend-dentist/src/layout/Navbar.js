import React from 'react'
import './Navbar.css';
import { Link, useLocation, useParams } from 'react-router-dom';

const Navbar = () => {

    const location = useLocation();

    const {id}=useParams();

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
                        <button className="btn btn-outline-success me-2" type="button">Novo Paciente</button>
                    )}
                    {(isProcedurePage) && (
                        <button className="btn btn-outline-success me-2" type="button">Novo Procedimento</button>
                    )}
                </form>
            </nav>
        </div>

    )
}

export default Navbar
