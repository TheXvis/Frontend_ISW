import BackToHomeButton from '../components/home';
import UserLoggedIn from '../components/userLoged';
import UserSearch from '../components/userSearch';
import withAuth from '../components/withAuth';
import React from 'react';

function AsPage() {
    return (
        <div>
            <BackToHomeButton/>
            <UserLoggedIn/>
            <h1>Página de asistente social</h1>
            <UserSearch/>
        </div>
    );
}

export default withAuth(AsPage);

//123456789
//contrasena