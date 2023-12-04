import CreateAsistenteSocial from "../components/crearAS";
import React from 'react';
import withAuth from '../components/withAuth';
// eslint-disable-next-line
import UserList from "../components/userList";



//10100100-1
//contrasenaAdmin

function AdminPage() {
    return (
      <div>
        <h1>Página de administrador</h1>
        <CreateAsistenteSocial/>
      </div>
    );
  }
  
  export default withAuth(AdminPage);