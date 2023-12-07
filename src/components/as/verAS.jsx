import { useState } from 'react';
import axios from 'axios';

function VerAsistenteSocial() {
    const [id, setId] = useState('');
    const [asistenteSocial, setAsistenteSocial] = useState(null);

    const handleSearch = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:80/as/get-as/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setAsistenteSocial(response.data.asistenteSocial);
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <div>
            <input type="text" value={id} onChange={(e) => setId(e.target.value)} required />
            <button onClick={handleSearch}>Ver asistente social</button>
            {asistenteSocial && (
                <div>
                    <p>Nombre: {asistenteSocial.name}</p>
                    <p>Correo: {asistenteSocial.correo}</p>
                    <p>Telefono: {asistenteSocial.telefono}</p>
                    <p>Dirección: {asistenteSocial.direccion}</p>
                    <p>Comuna: {asistenteSocial.comuna}</p>
                    <p>Región: {asistenteSocial.region}</p>
                </div>
            )}
        </div>
    );
}

export default VerAsistenteSocial;