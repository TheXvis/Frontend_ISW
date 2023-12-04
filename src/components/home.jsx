import { useNavigate } from 'react-router-dom';

function BackToHomeButton() {
    const navigate = useNavigate();

    return (
        <button className="back-to-home-button" onClick={() => navigate('/')}>Volver a inicio</button>
    );
}

export default BackToHomeButton;