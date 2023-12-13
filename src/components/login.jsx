
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';


function Login() {

    const navigate = useNavigate();
    const [_id, set_id] = useState('');
    const [password, setPassword] = useState('');
    const [userType] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
      
        try {
          const response = await fetch(`http://localhost:80/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ _id, password }),
          });
      
          if (!response.ok) {
            throw new Error('Error en la autenticación');
          }
      
          const data = await response.json();
          localStorage.removeItem('token');
          localStorage.removeItem('userType'); 
          localStorage.setItem('token', data.token);
          localStorage.setItem('userId', _id); 
          localStorage.setItem('userType', data.userType);
          navigate(`/${data.userType}`);
        } catch (error) {
          console.error('Error:', error);
        }
      };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
      };
    
      const toggleShowPassword = () => {
        setShowPassword(!showPassword);
      };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <input className="login-input" value={_id} onChange={e => set_id(e.target.value)} placeholder="Rut" />
            <input className="login-input" type={showPassword ? 'text' : 'password'} value={password} onChange={handlePasswordChange} placeholder="Contraseña"  />
            <button type="button" onClick={toggleShowPassword}>{showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}</button>
            <input type="submit" className="login-submit" value="Login" />
        </form>
    );
}

export default Login;