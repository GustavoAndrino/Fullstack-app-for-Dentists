import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

export const Clients = () => {

  const [clients, setClients] = useState([]);

  const {id}=useParams();

  useEffect(() => {
    loadClients();
  }, [])

  const loadClients = async() => {
    const result = await axios.get("http://localhost:8080/client?sortBy=id&direction=ASC");
    setClients(result.data);
  }


  return (
    <div>
<h1 className=''>Pacientes</h1>
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
