import React, { useEffect, useState } from 'react'
import { getWorkouts } from '../../services/wgerClient'
import Workout from '../../components/Workout'
import { useWorkout } from '../../context/WorkoutContext'
import { Link } from 'react-router-dom'
import { useUser } from '../../context/UserContext'
import { addWorkout, getWorkoutArray } from '../../services/supabaseClient'

import { useLocation } from 'react-router-dom'
import { mungeWorkouts } from '../../utils/utils'

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
      const dayWorkouts = await getWorkoutArray(date, user.id)
      const simpleArray = dayWorkouts.map((object) => object.workouts)
       const checkDupes = mungeWorkouts(simpleArray, JSON.stringify(workout.id));
       console.log(checkDupes,simpleArray, workout.id,)
      checkDupes
      ? console.log('workout already added for day')
      :  await addWorkout(user.id, date, workout.id) &&
        setWorkouts(...simpleArray, workout.id) 
        
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
