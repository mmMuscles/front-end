import { useContext, createContext, useState } from "react";

const workoutCtx = createContext();

export const WorkoutProvider = ({ children }) => {
    const [workouts, setWorkouts] = useState([])

return <workoutCtx.Provider value={{workouts, setWorkouts}}>{children}</workoutCtx.Provider>
}

export const useWorkout = () => {
    const context = useContext(workoutCtx)

    if(context === undefined){
        throw new Error('Invalid Provider')
    }

    return context;
}
