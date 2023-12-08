import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserLoggedIn() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        if (userId) {
            axios.get(`http://localhost:80/as/get-as/${userId}`,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                setUser(response.data.asistenteSocial);
            })
            .catch(error => {
                console.error('Error getting user details:', error);
            });
        }
    }, []);

    if (!user) {
        return <div>No hay usuario logueado</div>;
    }

    return (
        <div>
            <h2>Usuario logueado</h2>
            <p>Nombre: {user.name}</p>
            <p>Comuna: {user.comuna}</p>
        </div>
    );
}

export default UserLoggedIn;