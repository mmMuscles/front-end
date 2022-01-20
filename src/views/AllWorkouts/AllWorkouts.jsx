import React, { useEffect, useState } from 'react'
import { getWorkouts } from '../../services/wgerClient'
import Workout from '../../components/Workout'
import { addWorkout } from '../../services/supabaseClient'
import { useWorkout } from '../../context/WorkoutContext'
import { Link } from 'react-router-dom'
import { useUser } from '../../context/UserContext'
import { getWorkoutArray } from '../../services/supabaseClient'

import { useLocation } from 'react-router-dom'

export default function AllWorkouts() {

    const [exercises, setExercises] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { setWorkouts } = useWorkout();
    const location = useLocation();
    const date = location.search.split('=')[1]
    const {user} = useUser()

    
    useEffect(() => {

        const getAllWorkouts = async () => {
            const allWorkouts = await getWorkouts()
            setExercises(allWorkouts)
            const getArray = await getWorkoutArray(date, user.id)
            setWorkouts(getArray);
            setIsLoading(false)
            
        }
        getAllWorkouts()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date])

    const handleAdd = async (workout) => {        
       await addWorkout({ user_id: user.id, workouts: JSON.stringify([workout.id]), date: date})
        setWorkouts((prevState) => [...prevState, workout.id])
    }

    return (
        <div>

        <Link to='/calendar?date='>Back To Day</Link>

            {isLoading ? <h1 className='text-xl font-bold'>Loading...</h1> :
            <ul>
            {exercises.map((workout) => <li key={workout.id}>
                <Workout name={workout.name} description={workout.description} category={workout.category} onClick={() => handleAdd(workout)} />
            </li>)}</ul>
            }
        </div>
    )
}
