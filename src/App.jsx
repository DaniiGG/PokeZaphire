import { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query, limit } from 'firebase/firestore';
import { firestore } from './firebase'; // A
import './css/App.css';

function App() {
  const [pokemonData, setPokemonData] = useState([]); // Definición del estado pokemonData

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(firestore, 'puntuaciones'), orderBy('puntos', 'desc'), limit(5)); // B
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => doc.data());
        setPokemonData(data);
      } catch (error) {
        console.error('Error al obtener los datos de Firestore:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="elemento-con-fondo">
        <img src="../public/titulo.png"></img>
        <h1>¡Bienvenido a la mejor pokédex!</h1>
        <ul className='inicio'>
          <li>Encuentra todos los pokemons que puedas imaginar.</li>
          <li>Analiza las características de cada uno.</li>
          <li>Prueba nuestro minijuego.</li>
        </ul>

        <div className="tabla-container">
          <h2>5 Mejores puntuaciones</h2>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Puntos</th>
              </tr>
            </thead>
            <tbody>
              {pokemonData.map((pokemon, index) => (
                <tr key={index}>
                  <td>{pokemon.nombre}</td>
                  <td>{pokemon.puntos}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
