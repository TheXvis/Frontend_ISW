import React, { useState } from 'react';
import axios from 'axios';


function UserSearch() {
    const [userId, setUserId] = useState('');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        setLoading(true);
        setError(null);

        try {
        const response = await axios.get(`http://localhost:80/user/verUsuario/${userId}`);
        setUser(response.data);
        setLoading(false);
        } catch (error) {
        if (error.response && error.response.status === 404) {
            alert('Usuario no encontrado');
        } else {
            setError(error.message);
        }
        setLoading(false);
        }
    };
    if (loading) {
        return <div>Cargando...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleUnassign = async () => {
        try {
        await axios.delete(`http://localhost:80/as/${userId}/desasignarAS`);
        const updatedUser = { ...user, asAsignado: null };
        setUser(updatedUser);
        } catch (error) {
        console.error('Error al desasignar el asistente social', error);
        }
    };
    const token = localStorage.getItem('token');
    const handleAssign = async () => {
        try {

            const response = await axios.post('http://localhost:80/as/as-to-user', {
                userId: user._id
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            if (response.data.message === 'Asignacion exitosa') {
                setUser(response.data.user);
                alert('Asistente social asignado con éxito');
            } else {
                console.error('Error al asignar el asistente social:', response.data.message);
                if (response.data.message === 'El asistente social y el usuario no están en la misma comuna') {
                    alert('El asistente social y el usuario no están en la misma comuna');
                }
            }
        } catch (error) {
            console.error('Error al hacer la solicitud:', error);
        }
    };


    return (
        <div>
        <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
        <button onClick={handleSearch}>Buscar usuario</button>

        {user && (
            <div>
                <p>Usuario: {user.name}</p>
                <p>Comuna: {user.comuna}</p>
                <p>Asistente Social: {user.asAsignado ? user.asAsignado.nombre : "Ninguno"}</p>
                {!user.asAsignado && <button onClick={handleAssign}>Asignar</button>}
                <button onClick={handleUnassign}>Desasignar</button>
            </div>
        )}
        </div>
    );
}

export default UserSearch;