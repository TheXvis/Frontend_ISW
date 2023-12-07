import CreateAsistenteSocial from "../components/as/crearAS";
import React from 'react';
import withAuth from '../components/withAuth';
import BackToHomeButton from "../components/home";
import { useState } from 'react';
import DeleteAsistenteSocial from "../components/as/borrarAS";
import EditAsistenteSocial from "../components/as/editarAS";
import VerAsistenteSocial from "../components/as/verAS";

//10100100-1
//contrasenaAdmin

function AdminPage() {
  const [action, setAction] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (action) => {
    setAction(action);
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
};

return (
  <div>
      <BackToHomeButton/>
      <h1>Página de administrador</h1>
      <button onClick={toggleMenu}>Menú</button>
      {isOpen && (
          <div>
              <button onClick={() => handleSelect('buscar')}>Buscar asistente social</button>
              <button onClick={() => handleSelect('crear')}>Crear asistente social</button>
              <button onClick={() => handleSelect('editar')}>Editar asistente social</button>
              <button onClick={() => handleSelect('eliminar')}>Eliminar asistente social</button>
          </div>
      )}
      {action === 'buscar' && <VerAsistenteSocial/>}
      {action === 'crear' && <CreateAsistenteSocial/>}
      {action === 'editar' && <EditAsistenteSocial/>}
      {action === 'eliminar' && <DeleteAsistenteSocial/>}
  </div>
);
}
  
export default withAuth(AdminPage);