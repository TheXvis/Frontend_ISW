import React, { useState } from 'react';
import axios from 'axios';

function CreateAsistenteSocial() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [direccion, setDireccion] = useState('');
  const [comuna, setComuna] = useState('');
  const [region, setRegion] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const asistenteSocialData = {
      _id: id,
      name,
      password,
      telefono,
      correo,
      direccion,
      comuna,
      region,
    };
    const token = localStorage.getItem('token');
    console.log(token)
    try {
      const response = await axios.post('http://localhost:80/as/create-as', asistenteSocialData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  
  
  return (
    <div>
      <button onClick={() => setShowForm(!showForm)}> {showForm ? 'Ocultar formulario' : 'Mostrar formulario'}</button>
      {showForm && (
    <form onSubmit={handleSubmit}>
      <input type="text" value={id} onChange={(e) => setId(e.target.value)} placeholder="ID" required />
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" required />
      <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="Teléfono" required />
      <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder="Correo" required />
      <input type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} placeholder="Dirección" required />
      <input type="text" value={comuna} onChange={(e) => setComuna(e.target.value)} placeholder="Comuna" required />
      <input type="text" value={region} onChange={(e) => setRegion(e.target.value)} placeholder="Región" required />
      <button type="submit">Crear Asistente Social</button>
    </form>
    )}
    </div>
  );
}

export default CreateAsistenteSocial;