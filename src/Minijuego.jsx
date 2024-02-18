import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firestore } from './firebase';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import {  query, where, getDocs, doc, setDoc, updateDoc } from 'firebase/firestore';

import './css/minijuego.css';

function Minijuego() {
    const [pokemon, setPokemon] = useState(null);
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [pokemonList, setPokemonList] = useState([]);
    const [message, setMessage] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [maxScore, setMaxScore] = useState(0);
    const [shineEffect, setShineEffect] = useState(false); // Nuevo estado para el efecto de brillo
    const [user, setUser] = useState(null);
    const [score, setScore] = useState(0);
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);
                await fetchMaxScore(user.uid);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const guardarPunt = async () => {
        if (user) {
          try {
            // Realiza una consulta para buscar el documento con el mismo UID
            const scoreQuery = query(collection(firestore, 'puntuaciones'), where("uid", "==", user.uid));
            const querySnapshot = await getDocs(scoreQuery);
      
            if (!querySnapshot.empty) {
              // Si se encuentra un documento, actualiza los puntos si el nuevo puntaje es mayor
              const scoreDoc = querySnapshot.docs[0];
              const currentPoints = scoreDoc.data().puntos;
              if (score > currentPoints) {
                await updateDoc(doc(firestore, 'puntuaciones', scoreDoc.id), {
                  puntos: score
                });
              }
            } else {
              // Si no se encuentra ningún documento, crea uno nuevo con los puntos
              await setDoc(doc(firestore, 'puntuaciones', user.uid), {
                uid: user.uid,
                puntos: score, 
                nombre: user.displayName
              });
            }
          } catch (error) {
            console.error('Error al guardar la puntuación:', error);
          }
        }
      };

      const fetchMaxScore = async (uid) => {
        try {
            const scoreQuery = query(collection(firestore, 'puntuaciones'), where("uid", "==", uid));
            const querySnapshot = await getDocs(scoreQuery);

            if (!querySnapshot.empty) {
                const scoreDoc = querySnapshot.docs[0];
                const maxScore = scoreDoc.data().puntos;
                setMaxScore(maxScore);
            }
        } catch (error) {
            console.error('Error al obtener la puntuación máxima:', error);
        }
    };

    useEffect(() => {
        if (gameOver) {
            guardarPunt();
        }
    }, [gameOver]);

    useEffect(() => {
        fetchPokemonList();
    }, []);

    useEffect(() => {
        if (pokemon) {
            generarOpciones(pokemon);
        }
    }, [pokemon]);

    //Obtencion de pokemons random

    const fetchPokemonList = async () => {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=898');
            if (!response.ok) {
                throw new Error('Error al obtener la lista de Pokémon');
            }
            const data = await response.json();
            setPokemonList(data.results);
            fetchRandomPokemon();
        } catch (error) {
            console.error('Error al obtener la lista de Pokémon:', error);
        }
    };

    //se coge un pokemon

    const fetchRandomPokemon = async () => {
        try {
            const randomPokemonId = getRandomInt(1, 825);
            const response = await fetch('https://pokeapi.co/api/v2/pokemon/'+randomPokemonId);
            if (!response.ok) {
                throw new Error('Error al obtener un Pokémon aleatorio');
            }
            const data = await response.json();
            setPokemon(data);
            console.log("La opción correcta es "+ data.name);
            setShineEffect(false); 
        } catch (error) {
            console.error('Error al obtener un Pokémon aleatorio:', error);
        }
    };

    //se cogen otras tres opciones randomn
    const generarOpciones = (correctPokemon) => {
        const correctPokemonIndex = getRandomInt(0, 3);
        const optionsArray = [correctPokemon.name];

        while (optionsArray.length < 4) {
            const randomPokemonIndex = getRandomInt(0, pokemonList.length - 1);
            const randomPokemon = pokemonList[randomPokemonIndex];
            const randomPokemonName = randomPokemon.name;

            if (!optionsArray.includes(randomPokemonName)) {
                optionsArray.push(randomPokemonName);
            }
        }

        shuffleArray(optionsArray);
        setOptions(optionsArray);
    };

    //se mezclan
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    const getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };


    //se checkea el click
    const handleOptionClick = (option) => {
        setSelectedOption(option);
        
        //sumar 1 punto
        if (option === pokemon.name) {
            setScore(score + 1);
            if (score + 1 > maxScore) {
                setMaxScore(score + 1);
            }
            setShineEffect(true); 
            //empieza de nuevo
            setTimeout(() => {
                fetchRandomPokemon();
                setSelectedOption(null); 
            }, 1300); 
        } else {
            setGameOver(true); 
            setMessage('¡Incorrecto!');
            setTimeout(() => {
                setMessage(null);
            }, 1000); 
        }
        
        setMessage(option === pokemon.name ? '¡Correcto!' : '¡Incorrecto!');
        setTimeout(() => {
            setMessage(null);
        }, 1000); 
    };
    const handleRestartGame = () => {
        setScore(0);
        setGameOver(false);
        fetchRandomPokemon();
    };



    
    return (
            <div className="minijuego-container">
                <h2 className="minijuego-title">¡Adivina el Pokémon!</h2>
                <p>El objetivo es adivinar el mayor número de pokemon sin equivocarte.</p>
                <p>Es <b>IMPORTANTE</b> terminar la partida para que se guarde el resultado.</p>
                <hr></hr>
                <p className="minijuego-max-score">Récord personal: {maxScore}</p>
                <p className="minijuego-score">Puntuación: {score}</p>
                {message ? (<p className="minijuego-message">{message}</p>) : ( <span className="minijuego-message-placeholder"></span>)}
                
                {!gameOver && pokemon && (
                    <div>
                    <img 
                        src={pokemon.sprites.other.showdown.front_default} 
                        alt={pokemon.name} 
                        className={shineEffect ? "minijuego-pokemon-image shine" : "minijuego-pokemon-image"} 
                    />
                    <ul className="minijuego-options-list">
                        {options.map((option, index) => (
                        <li key={index} className="minijuego-option" onClick={() => handleOptionClick(option)}>
                            {option}
                        </li>
                        ))}
                    </ul>
                    </div>
                )}
                {gameOver && (
                    <div>
                    <p className="minijuego-message">¡Juego terminado!</p>
                    <button className="minijuego-restart-button" onClick={handleRestartGame}>Jugar de nuevo</button>
                    </div>
                )}
                
            </div>
    );
}

export default Minijuego;