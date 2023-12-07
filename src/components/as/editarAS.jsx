import { useState } from 'react';
import axios from 'axios';

function EditAsistenteSocial() {
    const [id, setId] = useState('');
    const [asistenteSocial, setAsistenteSocial] = useState(null);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo, setCorreo] = useState('');
    const [direccion, setDireccion] = useState('');
    const [comuna, setComuna] = useState('');
    const [region, setRegion] = useState('');

    const handleSearch = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:80/as/get-as/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setAsistenteSocial(response.data.asistenteSocial);
            setName(response.data.asistenteSocial.name);
            setPassword(response.data.asistenteSocial.password);
            setTelefono(response.data.asistenteSocial.telefono);
            setCorreo(response.data.asistenteSocial.correo);
            setDireccion(response.data.asistenteSocial.direccion);
            setComuna(response.data.asistenteSocial.comuna);
            setRegion(response.data.asistenteSocial.region);
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`http://localhost:80/as/update-as/${id}`, {
                name,
                password,
                telefono,
                correo,
                direccion,
                comuna,
                region
            }, {
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
            <input type="text" value={id} onChange={(e) => setId(e.target.value)} required />
            <button onClick={handleSearch}>Buscar asistente social</button>
            {asistenteSocial && (
                <form onSubmit={handleSubmit}>
                    <label>
                        Nombre:
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </label>
                    <label>
                        Contraseña:
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <label>
                        Teléfono:
                        <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                    </label>
                    <label>
                        Correo:
                        <input type="text" value={correo} onChange={(e) => setCorreo(e.target.value)} />
                    </label>
                    <label>
                        Dirección:
                        <input type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
                    </label>
                    <label>
                        Comuna:
                        <input type="text" value={comuna} onChange={(e) => setComuna(e.target.value)} />
                    </label>
                    <label>
                        Región:
                        <input type="text" value={region} onChange={(e) => setRegion(e.target.value)} />
                    </label>
                    <button type="submit">Actualizar asistente social</button>
                </form>
            )}
        </div>
    );
}

export default EditAsistenteSocial;