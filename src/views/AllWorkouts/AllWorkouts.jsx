import React, { useEffect, useState } from 'react'
import { getWorkouts } from '../../services/wgerClient'
import Workout from '../../components/Workout'
import { addWorkout } from '../../services/supabaseClient'
import { useWorkout } from '../../context/WorkoutContext'
import { Link } from 'react-router-dom'
import { useUser } from '../../context/UserContext'
import { addWorkouts } from '../../services/supabaseClient'

export default function AllWorkouts() {

    const [exercises, setExercises] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const {setWorkouts} = useWorkout();
    const {user} = useUser()


    useEffect(() => {

        const getAllWorkouts = async () => {
            const allWorkouts = await getWorkouts()
            setExercises(allWorkouts)
            setIsLoading(false)
            console.log(allWorkouts)
        }
        getAllWorkouts()

    }, [])



    const handleAdd = async (workout) => {
        await addWorkout({ user_id: user.id,  theme: workout.category, workout_id: workout.id, date: new Date()  })

        await addWorkouts({ workout_name: workout.name, workout_description: workout.description, workout_category: workout.category, workout_id: workout.id })

        setWorkouts((prevState) => [...prevState, workout])

    }



    return (
        <div>

        <Link to='/calendarday'>Back To Day</Link>

        {/* <select className="dropdown">
        {exercises.category.map((theme) => {
          return (
            <option key={theme.id} value={theme}>
              {theme}
            </option>
          );
        })}
      </select> */}




            {isLoading ? <h1 className='text-xl font-bold'>Loading...</h1> :
            <ul>
            {exercises.map((workout) => <li key={workout.id}>
                <Workout name={workout.name} description={workout.description} category={workout.category} onClick={() => handleAdd(workout)} />
            </li>)}</ul>
            }
        </div>
    )
}
