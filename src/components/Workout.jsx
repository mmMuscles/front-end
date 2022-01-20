import React from 'react'

export default function Workout({ name, description, category }) {

    return (

        <div>
            <h1 className='text-xl font-bold' >{name}</h1>
            <p dangerouslySetInnerHTML={{__html: description}}></p>
            <p><b>Category:</b> {category}</p>
        </div>

    )
}
