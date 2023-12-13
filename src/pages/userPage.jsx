import BackToHomeButton from "../components/home";
import SolicitarAsistencia from "../components/solAsistencia";
// 100200300
// contrasena
function UserPage() {
    return (
        <div>
            <BackToHomeButton/>
            <h1>Página de usuario</h1>
            <SolicitarAsistencia/>
        </div>
    );
}

export default UserPage;
