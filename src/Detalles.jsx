import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import StatsChart from './StatsChart'; // Importa el componente StatsChart
import './Detalles.css';

function Detalles(){

    const { id } = useParams();
    const [pokemonData, setPokemonData] = useState(null);
    const [showShiny, setShowShiny] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch('https://pokeapi.co/api/v2/pokemon/'+id)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener los datos del Pokémon');
                }
                return response.json();
            })
            .then(data => {
                console.log(data)
                setPokemonData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error al obtener los datos del Pokémon:', error);
                setLoading(false);
            });
    }, [id]);

    const toggleShiny = () => {
        setShowShiny(!showShiny);
    };

    const playCry = () => {
        if (pokemonData && pokemonData.cries) {
            const audio = new Audio(pokemonData.cries.latest);
            audio.play();
        }
    };

    return (
        <>
            <div className="pokemon-details-container">
            
                <h1 className='nombre-pok'>{pokemonData && pokemonData.name} Nº {pokemonData && pokemonData.id}</h1>
                {loading && <div className="loader">
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
                <div className="bar4"></div>
                <div className="bar5"></div>
                <div className="bar6"></div>
                <div className="bar7"></div>
                <div className="bar8"></div>
                <div className="bar9"></div>
                <div className="bar10"></div>
                <div className="bar11"></div>
                <div className="bar12"></div>
            </div>}
                {pokemonData && (
                    <div className="detalles-content">
                        <div className="foto">
                            <button onClick={toggleShiny}>{showShiny ? 'Versión Normal' : 'Versión Shiny'}</button>
                            <img src={showShiny ? pokemonData.sprites.other['official-artwork'].front_shiny : pokemonData.sprites.other['official-artwork'].front_default} alt={pokemonData.name} />
                        </div>
                        <div className="info">
                            <h2>Características</h2>
                            <button onClick={playCry}>Reproducir Alarido</button>
                            <p>{pokemonData.description}</p>
                            <h3>Altura: <span>{pokemonData.height / 10} m</span></h3>
                            <h3>Peso: <span>{pokemonData.weight / 10} kg</span></h3>
                            <h3>Habilidades por defecto:</h3>
                            <ul>
                                {pokemonData.abilities.map(ability => (
                                    <li key={ability.ability.name}>{ability.ability.name}</li>
                                ))}
                            </ul>
                            <h3>Tipos:</h3>
                            <ul>
                                {pokemonData.types.map(type => (
                                    <li key={type.slot}>{type.type.name}</li>
                                ))}
                            </ul>
                        </div>
                        <div className='moreFotos'>
                            <h2>Pokemon en combate</h2>
                            <img src={pokemonData.sprites.other.showdown.front_default} alt="Back Default" />
                            <img src={pokemonData.sprites.other.showdown.back_default} alt="Back Default" />
                            <img src={pokemonData.sprites.other.showdown.front_shiny} alt="Back Shiny" />
                            <img src={pokemonData.sprites.other.showdown.back_shiny} alt="Back Shiny" />
                        </div>
                        <div className="stats">
                            <h2>Estadísticas:</h2>
                            <ul className="stats-list">
                                {pokemonData.stats.map((stat, index) => (
                                    <li key={stat.stat.name}>
                                        <span className="stat-label">{stat.stat.name}</span>
                                        <progress className="stat-progress" value={stat.base_stat} max="100">{stat.base_stat}</progress>
                                        <p>{stat.base_stat}</p>
                                    </li>
                                ))}
                            </ul>
                            <StatsChart pokemonData={pokemonData} />
                        </div>
                        
                    </div>
                )}
            </div>
        </>
    );
}

export default Detalles;
