import Loading from './Loading'
import React, { useState, useEffect } from 'react'
import './css/Thumb.css'
import { NavLink, Link } from 'react-router-dom';

const Thumb = ({ name }) => {
    const [poke, setPoke] = useState([]);
    const [loading, setLoading] = useState(true);

    const getPoke = async () => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        const data = await res.json()
        setPoke(data)
        setLoading(false)
    }

    useEffect(() => {
        getPoke();
    }, [])

    const Thumbnail = () => {
        return (
            <>
                <p>#{poke.id}</p>
                <NavLink to={`/pokemon/${poke.id}`}>
                    <div className='thumb-background'>
                        <img src={poke.sprites.other.dream_world.front_default} alt={poke.name} />
                    </div>
                </NavLink>
                <p>{poke.name}</p>
            </>
        )
    }

    return (
        <div className='thumb-pokemon'>
            {loading ? <Loading /> : <Thumbnail />}
        </div>
    )
}

export default Thumb