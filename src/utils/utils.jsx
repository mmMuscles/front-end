
export const mungeWorkouts = (workoutArray, workoutId ) => {
    if (workoutArray.length === 0) return false;

    for(const item of workoutArray){
        if(JSON.stringify(item) === JSON.stringify(workoutId)){
        return true;
      } else return false
    }
  }