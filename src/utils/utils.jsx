
export const mungeWorkouts = (workoutArray, workoutId ) => {
    if (workoutArray.length === 0) return false;

    return workoutArray.find((item) => item === workoutId)
  }

  export const mungeDaily = (workoutID, allWorkouts) => {
    const newArray = [];
    for(let item of workoutID) {
        const result = allWorkouts.filter(( workout) => workout.id === item)
        newArray.push(result[0])
        }
    return newArray

  }