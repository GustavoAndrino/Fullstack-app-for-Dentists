import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './Clients.css'
import { ModalNewClient } from '../modals/ModalNewClient';


export const Clients = () => {

  const [clients, setClients] = useState([]);

  const { id } = useParams();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  useEffect(() => {
    loadClients();
  }, [])

  const loadClients = async () => {
    const result = await axios.get("http://localhost:8080/client?sortBy=id&direction=ASC");
    setClients(result.data);
  }


  return (
    <div>
      <div className='div2'>
        <h1 className='special-h1'>Pacientes</h1>
        <button type='button' className='button3' onClick={openModal}> Novo Paciente </button>
      </div>
      <ModalNewClient
      isOpen={modalIsOpen} 
      onClose={closeModal} 
      />
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">E-mail</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {
            clients.map((client, index) => (
              <tr>
                <th scope='row' key={index}>{index + 1}</th>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>
                  <Link class="btn btn-outline-primary me-2" type="button" to={`/procedure/${client.id}`}>Procedimentos</Link>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
