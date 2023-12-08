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

    function handleEmailClick(asistente) {
        window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${asistente.correo}`, '_blank', 'width=600,height=600');
    }

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Ingrese comuna" value={comuna} onChange={(e) => setComuna(e.target.value)} />
                <button type="submit">Buscar asistentes</button>
            </form>
            {asistentesSociales.length > 0 && (
                <div>
                    <h2>Asistentes sociales disponibles:</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>Teléfono</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {asistentesSociales.map((asistente, index) => {
                                console.log(asistente);
                                return (
                                    <tr key={index}>
                                        <td>{asistente.name}</td>
                                        <td>{asistente.correo}</td>
                                        <td>{asistente.telefono}</td>
                                        <td>
                                        <button onClick={() => handleEmailClick(asistente)}>Enviar correo</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default SolicitarAsistencia;