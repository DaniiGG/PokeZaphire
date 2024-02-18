import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAuth, signInWithEmailAndPassword, GithubAuthProvider } from "firebase/auth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import app from "./firebase";
import { useState } from "react";
import './css/login.css';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    function logueoGoogle() {
        const provider = new GoogleAuthProvider();
        const auth = getAuth(app);
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                console.log("Hola " + user.displayName);
                navigate("/");
            }).catch((error) => {
                const errorCode = error.code;
                let errorMessage = "Error al iniciar sesión con Google. Por favor, intenta de nuevo más tarde.";

                // Personalizar mensajes de error
                switch (errorCode) {
                    case "auth/popup-closed-by-user":
                        errorMessage = "El inicio de sesión con Google fue cancelado por el usuario.";
                        break;
                    // Agrega más casos según necesites
                    default:
                        errorMessage = error.message;
                }

                setError(errorMessage);
                console.error("Error al iniciar sesión con Google:", errorMessage);
            });
    }

    function loguearse() {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("Usuario inició sesión:", user);
                navigate("/");
            })
            .catch((error) => {
                const errorCode = error.code;
                let errorMessage = "";
    
                // Verificar el código de error para proporcionar mensajes de error personalizados
                switch (errorCode) {
                    // Agrega más casos según necesites
                    default:
                        errorMessage = "Credenciales incorrectas.";
                }
    
                setError(errorMessage);
                console.error("Error al iniciar sesión:", errorMessage);
            });
    }
    

    function github() {
        const provider = new GithubAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                console.log("Usuario inició sesión con GitHub:", user);
                navigate("/");
            }).catch((error) => {
                const errorCode = error.code;
                let errorMessage = "Error al iniciar sesión con GitHub. Por favor, intenta de nuevo más tarde.";

                // Personalizar mensajes de error
                switch (errorCode) {
                    // Agrega más casos según necesites
                    default:
                        errorMessage = error.message;
                }

                console.error("Error al iniciar sesión con GitHub:", errorMessage);
                setError(errorMessage);
            });
    }

    function handleSubmit(event) {
        event.preventDefault();
        setError(null);
        loguearse();
    }

    return (
        <div className="login-container">
            <h1>Iniciar Sesión</h1>
            <form onSubmit={handleSubmit} className="custom-form">
            {error && <p className="error-message">{error}</p>}
                <div>
                    <label>
                        Correo electrónico:
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </label>
                </div>
                <div>
                    <label>
                        Contraseña:
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </label>
                </div>
                <button className="login-button" type="submit">Iniciar Sesión</button>
            </form>
            
            <div className="social-login-buttons">
                <button className="google-login" onClick={logueoGoogle}><img src="../public/google.png"/></button>
                <button className="github-login" onClick={github}><img src="../public/GitHub.png"/></button>
            </div>
            <p>¿No tienes cuenta?<Link to="/register" >Regístrate</Link></p>
        </div>
    )
}

export default Login;
