import React from 'react'

export default function Workout({ name, description, category }) {

    return (

        <div>
            <h1 className='text-xl font-bold text-blue-500'>{name}</h1>
            <p className='mb-2 text-neutral-500'><b>Category:</b> {category}</p>
            <p className='text-sm'dangerouslySetInnerHTML={{__html: description}}></p>
        </div>

    )
}
