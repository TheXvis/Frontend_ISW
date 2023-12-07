import React, { useState } from 'react';
import axios from 'axios';

function SolicitarAsistencia() {
    const [comuna, setComuna] = useState('');
    const [asistentesSociales, setAsistentesSociales] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:80/user/solicitar-asistencia', { comuna }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        
            setAsistentesSociales(response.data.asistenteSocial);
            console.log(response.data.asistenteSocial); // Add this line
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>

                <input type="text" placeholder="Ingrese comuna"value={comuna} onChange={(e) => setComuna(e.target.value)} />

                <button type="submit">Buscar asistentes</button>
            </form>

        {asistentesSociales.length > 0 && (
        <div>
            <h2>Asistentes sociales disponibles:</h2>
            {asistentesSociales.map((asistente, index) => {
            console.log(asistente);
            return <p key={index}>{asistente.name}</p>;
            })}
        </div>
    )   }
        </div>
    );
}

export default SolicitarAsistencia;