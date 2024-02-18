import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Link } from "react-router-dom";
import './css/index.css'
import * as React from "react";
import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Pokemon from './Pokemon';
import Detalles from './Detalles';
import Minijuego from './Minijuego';
import Login from './Login.jsx';
import Register from './Register.jsx';
import Navegacion from './Navegacion.jsx';
import Footer from './footer.jsx';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const PageNotFound = () => (
  <div style={{ textAlign: "center" }}>
  <h1>404 - Página no encontrada</h1>
  <p>La página que buscas no existe.</p>
  <Link to="/" className="link">Volver a inicio</Link>
</div>
);

const AppRoutes = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<><Navegacion /><App /><Footer /></>} />
      <Route path="pokemon" element={<><Navegacion /><Pokemon /><Footer /></>} />
      <Route path="detalles/:id" element={<><Navegacion /><Detalles /><Footer /></>} />
      <Route path="minijuego" element={user ? (
        <><Navegacion /><Minijuego /><Footer /></>
      ) : (
        <><Navegacion /><Login /><Footer /></>
      )} />
      <Route path="login" element={<><Navegacion /><Login /><Footer /></>} />
      <Route path="register" element={<><Navegacion /><Register /><Footer /></>} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

createRoot(document.getElementById("root")).render(
  <Router>
    <AppRoutes />
  </Router>
);
