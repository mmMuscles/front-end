export const getWorkouts = async () => {
    const response = await fetch('https://wger.de/api/v2/exerciseinfo?language=2&limit=50')
    const data = await response.json()
    return data.results.map(workout => workoutMunger(workout))
}

export const workoutById = async (id) => {
    const response = await fetch(`api/v2/exerciseiinfo/${id}`)
    const data = await response.json()

    return data.results.map(workout => workoutMunger(workout))

}






const workoutMunger = (workout) => {
    const munger = {
        id: workout.id,
        name: workout.name,
        description: workout.description,
        category: workout.category.name,
    }

    return munger;
}

//https://wger.de/api/v2/exercise/?language=2&limit=100
