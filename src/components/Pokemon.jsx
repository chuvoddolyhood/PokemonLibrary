import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Pokemon = () => {
    const { id } = useParams();
    const [poke, setPoke] = useState([]);

    const getPoke = async () => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const data = await res.json()
        setPoke(data)

        console.log('log API:', data);
    }

    useEffect(() => {
        getPoke()
    }, []) //allPokemon

    console.log(poke.abilities.ability);

    return (
        <div className='poke-detail'>
            <h1>Pokemon {poke.name}</h1>
            <div className='poke-detail-container'>
                <div className='content-left'>
                    <img src="" alt="" />
                </div>
                <div className='content-center'>

                </div>
                <div className='content-right'>
                </div>
            </div>
        </div>
    )
}

export default Pokemon