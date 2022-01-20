import React, { useEffect, useState } from 'react'
import { getWorkouts } from '../../services/wgerClient'
import Workout from '../../components/Workout'
import { addWorkout, deleteWorkout } from '../../services/supabaseClient'
import { useWorkout } from '../../context/WorkoutContext'
import { Link } from 'react-router-dom'
import { useUser } from '../../context/UserContext'
import { getWorkoutArray } from '../../services/supabaseClient'

import { useLocation } from 'react-router-dom'
import Card from '../../components/Card/Card'

export default function AllWorkouts() {

    const [exercises, setExercises] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { workouts, setWorkouts } = useWorkout();
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

    const handleRemove = async (id) => {
        const confirmDelete = window.confirm('Would you like to remove workout from list?')
        if (confirmDelete){
            await deleteWorkout(id, user.id, date)
            const arrayAfterDelete = await getWorkoutArray()
            setWorkouts(arrayAfterDelete)
        }

    }

    return (
        <div>

        <Link to='/calendar?date='><button>Back To Day</button></Link>

            {isLoading ? <h1 className='text-xl font-bold'>Loading...</h1> :

            <ul>
            {exercises.map((workout) => <Card> <li key={workout.id}>
                <Workout name={workout.name} description={workout.description} category={workout.category}/>{workouts.includes(workout.id) ? <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => handleRemove(workout.id)}>Remove</button> : <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => handleAdd(workout)}>Add</button>}
            </li></Card>)}</ul>
            }
        </div>
    )
}
