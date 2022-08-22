import React from 'react'
import { NavLink } from 'react-router-dom'

const Item = ({ id, name, img, types }) => {
    const style = `thumb-container ${types[0].type.name}`

    return (
        <div className={style} >
            <div className='number'>
                <p>#0{id}</p>
            </div>
            <img src={img} alt={name} />
            <div className='detail-wrapper'>
                <h3>{name}</h3>
                <div className='type'>
                    {types.map((tp, index) => {
                        const styleButton = `buttonType ${tp.type.name}`
                        return (
                            <button key={index} className={styleButton}> {tp.type.name}</button>
                        )
                    })}
                </div>
                <NavLink to={`/pokemon/${id}`}>Show</NavLink>
            </div>
        </div>
    )
}

export default Item