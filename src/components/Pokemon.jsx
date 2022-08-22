import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Pokemon = () => {
    const { id } = useParams();
    const [poke, setPoke] = useState([]);
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const getPoke = async () => {
            setLoading(true)
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            const data = await res.json()
            setPoke(data)
            setLoading(false)
        }
        getPoke();
    }, []) //allPokemon

    const Loading = () => {
        return (
            <>
                Loading...
            </>
        )
    }

    const ShowProduct = () => {
        return (
            <>
                <h1>Pokemon {poke.name}</h1>
                <div className='poke-detail-container'>
                    <div className='content-left'>
                        <img src={poke.sprites.other.dream_world.front_default} alt={poke.name} />
                    </div>
                    <div className='content-center'>
                    </div>
                    <div className='content-right'>
                    </div>
                </div>
            </>
        )
    }

    return (
        <div className='poke-detail'>
            {console.log(poke)}
            {loading ? <Loading /> : <ShowProduct />}
        </div>
    )
}

export default Pokemon