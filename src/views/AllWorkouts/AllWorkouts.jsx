import React, { useEffect, useState } from 'react'
import { getWorkouts } from '../../services/wgerClient'
import Workout from '../../components/Workout'
import { addWorkout } from '../../services/supabaseClient'

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

    const handleAdd = async (workout) => {
        await addWorkout({ workout_name: workout.name, workout_description: workout.description, workout_category: workout.category, workout_id: workout.id  })

    }



    return (
        <div>
            {isLoading ? <h1 className='text-xl font-bold'>Loading...</h1> :
            <ul>
            {workouts.map((workout) => <li key={workout.id}>
                <Workout name={workout.name} description={workout.description} category={workout.category} onClick={() => handleAdd(workout)} />
            </li>)}</ul>
            }
        </div>
    )
}
