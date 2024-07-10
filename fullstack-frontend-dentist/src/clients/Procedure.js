import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export const Procedure = () => {

    const {id}=useParams();

    const [procedure, setProcedure] = useState([]);

    useEffect(() =>{
        loadProcedure();
    }, [])

     const loadProcedure= async() => {
        const result = await axios.get(`http://localhost:8080/procedure/${id}`)
        setProcedure(result.data)
     }

  return (
    <div>
        <h1 className=''>Procedimentos do client {id}</h1>
<table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Nome do Procedimento</th>
      <th scope="col">Data do Procedimento</th>
      <th scope="col">Valor do Procedimento</th>
    </tr>
  </thead>
  <tbody>
    { 
      procedure.map((proc, index) => (
        <tr>
          <th scope='row' key={index}>{index + 1}</th>
          <td>{proc.procedure}</td>
          <td>{proc.date}</td>
          <td>{proc.value}</td>
        </tr>
      ))
    }
  </tbody>
</table>
    </div>
  )
}
