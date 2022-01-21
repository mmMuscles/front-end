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
import { mungeWorkouts } from '../../utils/utils'
import "./AllWorkouts.css";

export default function AllWorkouts() {

    const [exercises, setExercises] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { workouts, setWorkouts } = useWorkout();
    const [offset, setOffset] = useState(0)
    const location = useLocation();
    // const date = location.search.split('=')[1]
    const dateY = location.search.split('=')[1]
    const date = dateY.split('&')[0]
    const theme = location.search.split('&')[1]
    const {user} = useUser()

    useEffect(() => {

        const getAllWorkouts = async () => {
            const allWorkouts = await getWorkouts(offset)
            setExercises(allWorkouts)
            const getArray = await getWorkoutArray(date, user.id)
            const getArray2 = getArray.map((object) =>+object.workouts)
            setWorkouts(getArray2);
            setIsLoading(false)

        }
        getAllWorkouts()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date, offset])

    const handleRemove = async (id) => {
        const confirmDelete = window.confirm('Would you like to remove workout from list?')
        if (confirmDelete){
            await deleteWorkout(id, user.id, date)
            const arrayAfterDelete = await getWorkoutArray(date, user.id)

            const exerciseArray = arrayAfterDelete.map((object) =>+object.workouts)

            setWorkouts(exerciseArray)
        }
    }

    const handleAdd = async (workout) => {
        const dayWorkouts = await getWorkoutArray(date, user.id)
        const simpleArray = dayWorkouts.map((object) =>+object.workouts)
        const checkDupes = mungeWorkouts(simpleArray, workout.id);
    //    const workObj = {{workout.id}: workout}
      checkDupes
      ? console.log('workout already added for day')
      :  await addWorkout( theme, user.id, date, workout.id) &&
        setWorkouts((prevState)=> [...prevState, workout.id]);


    }

    return (
        <div className='m-14'>
        <Link to={`/calendar?date=${date}`}><button className='bg-yellow-700 hover:bg-yellow-700 text-white font-bold py-2 px-4 m-3 rounded'>Back To Day</button></Link>

            {offset > 0 ? <button  onClick={() => setOffset(offset - 10)} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-3 rounded'>Prev Page</button> : null}

            {exercises.length >= 10 ? <button onClick={() => setOffset(offset + 10)} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-3 rounded'>Next Page</button> : null}
            {isLoading ? <h1 className='text-xl font-bold'>Loading...</h1> :

            <ul className='all-the-workouts'>
            {exercises.map((workout) => <Card key={workout.id}> <li key={workout.id}>
            {workouts.includes(workout.id) ? <button className='bg-red-700 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-1 rounded object-right-bottom' onClick={() => handleRemove(workout.id)}>Remove</button>
                : <button className='bg-gray-400 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-1 rounded object-right-bottom' onClick={() => handleAdd(workout)}><span>Add</span><span>+</span></button>}
                <Workout name={workout.name} description={workout.description} category={workout.category}/>
            </li></Card>)}</ul>
            }
        </div>
    )
}
