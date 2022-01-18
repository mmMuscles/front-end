import React, { useEffect, useState } from 'react'
import { getWorkouts } from '../../services/wgerClient'
import Workout from '../../components/Workout'

export default function AllWorkouts() {

    const [workouts, setWorkouts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {

        const getAllWorkouts = async () => {
            const allWorkouts = await getWorkouts()
            setWorkouts(allWorkouts)
            setIsLoading(false)
            console.log(allWorkouts)
        }
        getAllWorkouts()

    }, [])

    return (
        <div>
            {isLoading ? <h1 className='text-xl font-bold'>Loading...</h1> :
            <ul>
            {workouts.map((workout) => <li key={workout.id}>
                <Workout name={workout.name} description={workout.description} category={workout.category} />
            </li>)}</ul>
            }
        </div>
    )
}
