import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Pokemon = () => {
    const { id } = useParams();
    const [poke, setPoke] = useState([]);
    const [species, setSpecies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingSpecies, setLoadingSpecies] = useState(true);


    const getPoke = async () => {
        // setLoading(true)
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const data = await res.json()
        setPoke(data)
        setLoading(false)
    }

    const getSpecies = async () => {
        // setLoadingSpecies(true)
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
        const data = await res.json()
        setSpecies(data)
        setLoadingSpecies(false)
    }

    useEffect(() => {
        getPoke();
    }, []) //allPokemon

    useEffect(() => {
        getSpecies()
    }, [])

    const Loading = () => {
        return (
            <>
                Loading...
            </>
        )
    }

    const ShowPoke = () => {
        return (
            <>
                <h1>#{id}</h1>
                <h1>Pokemon {poke.name}</h1>
                <h3>Bio</h3>
                {loadingSpecies ? <Loading /> : species.flavor_text_entries.map((bio, index) => {
                    return (
                        <p key={index}>{bio.flavor_text}</p>
                    )
                })}
                <h3>Genus</h3>
                <p></p>
                <h3>Species</h3>
                <p>{poke.species.name}</p>
                <h3>Height</h3>
                <p>{poke.height / 10} m</p>
                <h3>Weight</h3>
                <p>{poke.weight / 10} kg</p>
                <h3>Abilities</h3>
                {poke.abilities.map((abi, index) => {
                    return (
                        <p key={index}>{abi.ability.name}</p>
                    )
                })}
                <h2>Training</h2>
                <h3>Base Exp</h3>
                <p>{poke.base_experience}</p>
                <h3>Base happiness</h3>
                <p></p>
                <h3>Catch Rate</h3>
                <p></p>
                <h3>Growth Rate</h3>
                <p></p>
                <h2>Stats</h2>
                <h3>HP</h3>
                <p>{poke.stats[0].base_stat} <span>(Effort: {poke.stats[0].effort})</span></p>
                <h3>Attack</h3>
                <p>{poke.stats[1].base_stat} <span>(Effort: {poke.stats[1].effort})</span></p>
                <h3>Defense</h3>
                <p>{poke.stats[2].base_stat} <span>(Effort: {poke.stats[2].effort})</span></p>
                <h3>Special-attack</h3>
                <p>{poke.stats[3].base_stat} <span>(Effort: {poke.stats[3].effort})</span></p>
                <h3>Special-defense</h3>
                <p>{poke.stats[4].base_stat} <span>(Effort: {poke.stats[4].effort})</span></p>
                <h3>Speed</h3>
                <p>{poke.stats[5].base_stat} <span>(Effort: {poke.stats[5].effort})</span></p>
                <h3>Type</h3>
                {poke.types.map((tp, index) => {
                    return (
                        <p key={index}>{tp.type.name}</p>
                    )
                })}
                <h2>Evolution</h2>

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

    /**
     * Khi API đang await chưa có dữ liệu gọi về, nên loading ban đầu sẽ true sẽ chạy vào Loading và đã mounted vào. Sau đó useEffect chạy để cập nhật giá trị từ API vào poke[] và ở đây gặp hàm setLoading(false) -> render lại toàn bộ component (redraw) thì lặp lại sẽ chạy vô return() ở đây 
     * 
     * Khi loading đã là false thì chạy vào <ShowPoke> -> và đã có dữ liệu trong hàm poke[] thì đã đổ ra màn hình
     * 
     */
    return (
        <div className='poke-detail'>
            {loading ? <Loading /> : <ShowPoke />}
        </div>
    )
}

export default Pokemon