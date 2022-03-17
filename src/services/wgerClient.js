export const getWorkouts = async (offset) => {
    const response = await fetch(`https://wger.de/api/v2/exerciseinfo?language=2&limit=10&offset=${offset}`)
    const data = await response.json()
    return data.results.map(workout => workoutMunger(workout))
}

export const getWorkoutsNoPage = async () => {
    const response = await fetch(`https://wger.de/api/v2/exerciseinfo?language=2&limit=1000`)
    const data = await response.json()
    return data.results.map(workout => workoutMunger(workout))
}

export const workoutById = async (id) => {
    const response = await fetch(`https://wger.de/api/v2/exerciseinfo/${id}`)
    const data = await response.json()

    return workoutMunger(data);

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
