import React from 'react'
import Detail from './Detail'

const Item = ({ id, name, img, types, weight, height }) => {
    const style = `thumb-container ${types[0].type.name}`

    return (
        <div className={style} onClick={() => { alert(window.location.href + name) }}>
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
                {/* <p>weight: {weight} </p>
                <p>height: {height} </p> */}
            </div>
        </div>
    )
}

export default Item