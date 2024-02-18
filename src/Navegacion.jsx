import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import './header.css';

function Navegacion() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setUser(user);
      } else {
        // User is signed out
        setUser(null);
      }
    });

    // Cleanup function
    return () => unsubscribe();
  }, []);

  function alternarSignOut() {
    const auth = getAuth();
    firebaseSignOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <header>
      <nav className="menu">
        <div className="inicio">
          <Link  to="/" >
            <img height={40} src="../src/assets/titulo.png"/>
          </Link>
        </div>
        <div>
          <Link to="/pokemon"  className="link">Lista de Pokemons</Link>
          {user && <Link to="/minijuego"  className="link">Minijuego</Link>}
        </div>
        <div>
          {user ? (
            <div>
              <span className="user">Bienvenido, {user.displayName ? user.displayName : user.email}</span>
              <a className="link" onClick={alternarSignOut}>Cerrar sesión</a>
            </div>
          ) : (
            <Link to="/login"  className="link">Login</Link>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navegacion;
