import { useState } from 'react';
import axios from 'axios';

function DeleteAsistenteSocial() {
    const [id, setId] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`http://localhost:80/as/delete-as/${id}`, {
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
        <form onSubmit={handleSubmit}>
            <label>
                ID del asistente social:
                <input type="text" value={id} onChange={(e) => setId(e.target.value)} required />
            </label>
            <button type="submit">Eliminar asistente social</button>
        </form>
    );
}

export default DeleteAsistenteSocial;