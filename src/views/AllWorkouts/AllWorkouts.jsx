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
    const [added, setAdded] = useState(false)
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

<<<<<<< HEAD
    }, [date, setWorkouts, user.id])



    const handleAdd = async (workout) => {

        //if workout array in table... add workout.id to array ...start new array with workout.id

        await addWorkout({ user_id: user.id,  theme: workout.category, workouts: [workout.id], date: date})
        //munge data
        // await addWorkouts({ workout_name: workout.name, workout_description: workout.description, workout_category: workout.category, workout_id: workout.id })
        setWorkouts((prevState) => [...prevState, workout.id])
        setAdded(true)
=======
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date])
>>>>>>> b7966626a001b7fa66cab40372d85a61d28deeaf

    const handleAdd = async (workout) => {        
       await addWorkout({ user_id: user.id, workouts: JSON.stringify([workout.id]), date: date})
        setWorkouts((prevState) => [...prevState, workout.id])
    }

    const handleRemove = async (id) => {
        await deleteWorkout(id)
        setAdded(false)
    }

    return (
        <div>

        <Link to='/calendar?date='><button>Back To Day</button></Link>

<<<<<<< HEAD
        {/* <select className="dropdown">
        {exercises.results.category.map((theme) => {
          return (
            <option key={theme.id} value={theme}>
              {theme}
            </option>
          );
        })}
      </select> */}

=======
>>>>>>> b7966626a001b7fa66cab40372d85a61d28deeaf
            {isLoading ? <h1 className='text-xl font-bold'>Loading...</h1> :

            <ul>
            {exercises.map((workout) => <Card> <li key={workout.id}>
                <Workout name={workout.name} description={workout.description} category={workout.category}/>{workouts.includes(workout.id) ? <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => handleRemove()}>Remove</button> : <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => handleAdd(workout)}>Add</button>}
            </li></Card>)}</ul>
            }
        </div>
    )
}
// onClick={() => handleAdd(workout)}
