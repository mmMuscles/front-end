
export const mungeWorkouts = (workoutArray, workoutId ) => {
    if (workoutArray.length === 0) return false;

    return workoutArray.find((item) => item === workoutId)
  }