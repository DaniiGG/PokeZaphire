import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/pokemon.css';

function Pokemon() {
    const [listaPokemon, setListaPokemon] = useState([]);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true); 
        fetch('https://pokeapi.co/api/v2/pokemon?offset=' + offset + '&limit=8')
            .then(response => response.json())
            .then(data => {
                setListaPokemon(prevList => [...prevList, ...data.results]);
                setLoading(false); 
            })
            .catch(error => {
                console.error('Error al mostrar la lista:', error);
                setLoading(false);
            });
    }, [offset]);

    const mostrarMas = () => {
        setOffset(prevOffset => prevOffset + 8);
    };

    const getId = url => {
        const partes = url.split('/');
        return partes[partes.length - 2];
    };

    const TiposId = ({ url }) => {
        const [types, setTypes] = useState([]);
        const [id, setId] = useState(null);

        useEffect(() => {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    setTypes(data.types.map(type => type.type.name));
                    setId(data.id);
                })
                .catch(error => console.error('Error al obtener tipos e ID:', error));
        }, [url]);


        return (
            <div className="types-and-id">
                <span className="id">N.º {id}</span>
                <div className="types">
                    {types.map((type, index) => {
                        let backgroundColor = '#fff'; 
                        switch (type) {
                            case 'grass':
                                backgroundColor = '#C6D166';
                                break;
                            case 'fire':
                                backgroundColor = '#F5AC78';
                                break;
                            case 'water':
                                backgroundColor = '#9DB7F5';
                                break;
                            case 'poison':
                                backgroundColor = '#7643FA';
                                break;
                            case 'bug':
                                backgroundColor = '#9DFA12';
                                break;
                            case 'normal':
                                backgroundColor = '#E8D7CD';
                                break;
                            case 'flying':
                                backgroundColor = '#A4E9E4';
                                break;
                            case 'fairy':
                                backgroundColor = '#F5AFF3';
                                break;
                            case 'ground':
                                backgroundColor = '#F4D1B1';
                                break;
                            case 'electric':
                                backgroundColor = '#F4D725';
                                break;
                            case 'fighting':
                                backgroundColor = '#F25F2C';
                                break;
                            case 'psychic':
                                backgroundColor = '#F460DE';
                                break;
                            case 'rock':
                                backgroundColor = '#9E7976';
                                break;
                            case 'steel':
                                backgroundColor = '#A39793';
                                break;
                            case 'ice':
                                backgroundColor = '#CBEDE6';
                                break;
                            case 'ghost':
                                backgroundColor = '#672576';
                                break;
                            default:
                                backgroundColor = '#fff';
                                break;
                        }
                        return (
                            <span style={{ backgroundColor: backgroundColor }} key={index} className="type">
                                {type}
                            </span>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <>
            <h1>Lista de Pokémon</h1>
            <ul className="pokemon-container">
                {listaPokemon.map(pokemon => (
                    <li key={pokemon.name} className="pokemon-item">
                        <Link to={'/detalles/' + getId(pokemon.url)}>
                            <img
                                src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' +getId(pokemon.url) +'.png'}
                                alt={pokemon.name}
                            />
                            <span className="name">{pokemon.name}</span>
                            <TiposId url={pokemon.url} />
                        </Link>
                    </li>
                ))}
            </ul>
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
            <div className="btn-container">
                <button onClick={mostrarMas}>Mostrar Más</button>
                
            </div>
        </>
    );
}

export default Pokemon;
