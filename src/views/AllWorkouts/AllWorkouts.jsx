import React, { useEffect, useState } from 'react'
import { getWorkouts } from '../../services/wgerClient'

export default function AllWorkouts() {

    const [workouts, setWorkouts] = useState([])

    useEffect(() => {
        
        const getAllWorkouts = async () => {
            const allWorkouts = await getWorkouts()
            setWorkouts(allWorkouts)
            console.log(allWorkouts)
        }
        getAllWorkouts()
        
    }, [])
 
    return (
        <div>
            <ul>
                {workouts.map((workout) => <div>{workout.name}</div>
                )
                }
            </ul>
        </div>
    )
}
