import React, { useEffect, useState } from 'react'
import { getWorkouts } from '../../Services/wgerClient'

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
            {isLoading ? <h1>Loading...</h1> :
            <ul>
                {workouts.map((workout) => <div key={workout.id}>{workout.name}
                <div dangerouslySetInnerHTML={{__html: workout.description}}></div>
                </div>
                )
                }
            </ul>}
        </div>
    )
}
