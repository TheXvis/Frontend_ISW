import { useNavigate } from 'react-router-dom';

function BackToHomeButton() {
    const navigate = useNavigate();

    const handleClick = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <button className="back-to-home-button" onClick={handleClick}>Volver a inicio</button>
    );
}

export default BackToHomeButton;