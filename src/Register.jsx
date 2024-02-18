import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import app from "./firebase";
import './login.css';

function Registrar() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    function registrarse() {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            
            return updateProfile(user, {
                displayName: username
            }).then(() => {
                console.log("Nombre de usuario vinculado con éxito.");
                navigate("/");
            }).catch((error) => {
                console.error("Error al vincular nombre de usuario:", error.message);
                setError(error.message);
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            let errorMessage = "Error al registrar. Por favor, intenta de nuevo más tarde.";

            // Personalizar mensajes de error
            switch (errorCode) {
                case "auth/email-already-in-use":
                    errorMessage = "El correo electrónico ya está en uso.";
                    break;
                case "auth/weak-password":
                    errorMessage = "La contraseña es débil. Debe tener al menos 6 caracteres.";
                    break;
                // Agrega más casos según necesites
                default:
                    errorMessage = error.message;
            }

            setError(errorMessage);
            console.error("Error al registrar:", errorMessage);
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        setError(null);
        registrarse();
    }

    return (
        <div>
            <h1>Registro</h1>
            <form onSubmit={handleSubmit} className="custom-form">
            {error && <p className="error-message">{error}</p>}
                <div>
                    <label>
                        Nombre de usuario:
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </label>
                </div>
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
                <button className="login-button" type="submit">Registrarse</button>
            </form>
            
        </div>
    );
}

export default Registrar;