import React, { useEffect, useRef, useState } from 'react'
import Item from './Item'
import './Pokemon.css'

const List = () => {
    const [allPokemon, setAllPokemon] = useState([])
    const [api, setApi] = useState('https://pokeapi.co/api/v2/pokemon?limit=20')
    const nextAPI = useRef();

    const getAllPokemon = async () => {
        const res = await fetch(api)
        const data = await res.json()

        // console.log('log API:', data.next);
        setApi(data.next)
        nextAPI.current = data.next;

        // console.log('log:', data.results);
        // console.log('log:', data.results[0].name);

        function createPokemonObject(result) {
            result.forEach(async (pokemon) => {
                const resPoke = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
                const dataPoke = await resPoke.json()
                setAllPokemon(prev => [...prev, dataPoke])

                // console.log('log name:', dataPoke.stats[0].base_stat);
            })
        }
        createPokemonObject(data.results);
        // await console.log(allPokemon);
    }

    useEffect(() => {
        getAllPokemon()
    }, []) //allPokemon


    return (
        <div className='app-contaner'>
            <h1>Pokedex</h1>
            <div className='all-container'>
                {allPokemon.map((pokemon, index) => {
                    return (
                        <div key={index}>
                            <Item
                                id={pokemon.id}
                                name={pokemon.name}
                                img={pokemon.sprites.other.dream_world.front_default}
                                types={pokemon.types}
                                weight={pokemon.weight}
                                height={pokemon.height}
                            />
                        </div>
                    )
                })}
            </div>
            {nextAPI.current != null &&
                <div>
                    <button className='load-more' onClick={() => getAllPokemon()}>Load more</button>
                </div>
            }
        </div>
    )
}

export default List