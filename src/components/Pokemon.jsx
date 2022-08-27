import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import Thumb from './Thumb';
import './css/Detail.css'

const Pokemon = () => {
    const { id } = useParams();
    const [poke, setPoke] = useState([]);
    const [species, setSpecies] = useState([]);
    const [apiEvolution, setApiEvolution] = useState('')
    const [evolution, setEvolution] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingSpecies, setLoadingSpecies] = useState(true);
    const [loadingEvolution, setLoadingEvolution] = useState(true);

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
        setApiEvolution(data.evolution_chain.url)
        setLoadingSpecies(false)
    }

    const getEvolution = async () => {
        const res = await fetch(apiEvolution)
        const data = await res.json()
        setEvolution(data)
        setLoadingEvolution(false)
    }

    useEffect(() => {
        getPoke();
    }, []) //allPokemon

    useEffect(() => {
        getSpecies()
    }, [])

    useEffect(() => {
        getEvolution()
    }, [apiEvolution])

    const Loading = () => {
        return (
            <>
                Loading...
            </>
        )
    }

    //Chuyen mau theo thuoc tinh (pokemon type)
    // const typeStyle = `img-container rock`
    // console.log(typeStyle);


    const ShowPoke = () => {
        return (
            <>
                <div className='poke-detail-container'>
                    <div className='content-left'>
                        <div className='img-container'>
                            <h2>#{id}</h2>
                            <img src={poke.sprites.other.dream_world.front_default} alt={poke.name} />
                            <h2>{poke.name}</h2>
                        </div>
                    </div>
                    <div className='content-center'>
                        <h3>Bio</h3>
                        {species.flavor_text_entries.map((bio, index) => {
                            if (bio.language.name === "en" && bio.version.name === "red") {
                                return (
                                    <p key={index}>{bio.flavor_text}</p>
                                )
                            }
                        })}
                        <div className='property-poke'>
                            <div className='left-property'>
                                <p className='stats-title'>Genus:</p>
                            </div>
                            <div className='right-property'>
                                {species.genera.map((gen, index) => {
                                    if (gen.language.name === "en") {
                                        return (
                                            <p key={index}>{gen.genus}</p>
                                        )
                                    }
                                })}
                            </div>
                        </div>
                        <div className='property-poke'>
                            <div className='left-property'>
                                <p className='stats-title'>Habitat:</p>
                            </div>
                            <div className='right-property'>
                                <p>{species.habitat.name}</p>
                            </div>
                        </div>
                        <div className='property-poke'>
                            <div className='left-property'>
                                <p className='stats-title'>Height:</p>
                            </div>
                            <div className='right-property'>
                                <p>{poke.height / 10} m</p>
                            </div>
                        </div>
                        <div className='property-poke'>
                            <div className='left-property'>
                                <p className='stats-title'>Weight:</p>
                            </div>
                            <div className='right-property'>
                                <p>{poke.weight / 10} kg</p>
                            </div>
                        </div>
                        <div className='property-poke'>
                            <div className='left-property'>
                                <p className='stats-title'>Abilities:</p>
                            </div>
                            <div className='right-property'>
                                {poke.abilities.map((abi, index) => {
                                    return (
                                        <p key={index}>{abi.ability.name}</p>
                                    )
                                })}
                            </div>
                        </div>
                        <div className='property-poke'>
                            <div className='left-property'>
                                <p className='stats-title'>Type:</p>
                            </div>
                            <div className='right-property'>
                                {poke.types.map((tp, index) => {
                                    return (
                                        <p key={index}>{tp.type.name}</p>
                                    )
                                })}
                            </div>
                        </div>
                        <div className='property-poke'>
                            <div className='left-property'>
                                <p className='stats-title'>Legendary:</p>
                            </div>
                            <div className='right-property'>
                                {species.is_legendary ? <p>Legendary</p> : <p>Not legendary</p>}
                            </div>
                        </div>
                        <h3>Training</h3>
                        <div className='property-poke'>
                            <div className='left-property'>
                                <p className='stats-title'>Base Exp:</p>
                            </div>
                            <div className='right-property'>
                                <p>{poke.base_experience}</p>
                            </div>
                        </div>
                        <div className='property-poke'>
                            <div className='left-property'>
                                <p className='stats-title'>Base Happiness:</p>
                            </div>
                            <div className='right-property'>
                                <p>{species.base_happiness}</p>
                            </div>
                        </div>
                        <div className='property-poke'>
                            <div className='left-property'>
                                <p className='stats-title'>Catch Rate:</p>
                            </div>
                            <div className='right-property'>
                                <p>{species.capture_rate}</p>
                            </div>
                        </div>
                        <div className='property-poke'>
                            <div className='left-property'>
                                <p className='stats-title'>Growth Rate:</p>
                            </div>
                            <div className='right-property'>
                                <p>{species.growth_rate.name}</p>
                            </div>
                        </div>
                    </div>
                    <div className='content-right'>
                        <div className='stats-poke'>
                            <h3>Stats</h3>
                            <div className='stats-container'>
                                <div className='stats-component'>
                                    <p className='stats-title'>HP</p>
                                    <p title={poke.stats[0].effort}>{poke.stats[0].base_stat}</p>
                                </div>
                                <div className='stats-component'>
                                    <p className='stats-title'>Attack</p>
                                    <p title={poke.stats[1].effort}>{poke.stats[1].base_stat}</p>
                                </div>
                                <div className='stats-component'>
                                    <p className='stats-title'>Defense</p>
                                    <p title={poke.stats[2].effort}>{poke.stats[2].base_stat}</p>
                                </div>
                                <div className='stats-component'>
                                    <p className='stats-title'>Special-attack</p>
                                    <p title={poke.stats[3].effort}>{poke.stats[3].base_stat}</p>
                                </div>
                                <div className='stats-component'>
                                    <p className='stats-title'>Special-defense</p>
                                    <p title={poke.stats[4].effort}>{poke.stats[4].base_stat}</p>
                                </div>
                                <div className='stats-component'>
                                    <p className='stats-title'>Speed</p>
                                    <p title={poke.stats[5].effort}>{poke.stats[5].base_stat}</p>
                                </div>
                            </div>
                        </div>
                        <div className='evolution'>
                            <h3>Evolution</h3>
                            <div className='evolution-container'>
                                {evolution.chain.species.name !== null ? <Thumb name={evolution.chain.species.name} /> : <Loading />}
                                {evolution.chain.evolves_to.length !== 0 ? <Thumb name={evolution.chain.evolves_to[0].species.name} /> : <Loading />}
                                {evolution.chain.evolves_to[0].evolves_to.length !== 0 ? <Thumb name={evolution.chain.evolves_to[0].evolves_to[0].species.name} /> : <Loading />}
                            </div>
                        </div>
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
            {loading || loadingSpecies || loadingEvolution ? <Loading /> : <ShowPoke />}
        </div>
    )
}

export default Pokemon