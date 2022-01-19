import React from "react";
import { Link } from "react-router-dom";
import { useWorkout } from "../../context/WorkoutContext";


export default function CalendarDay() {
const {workouts} = useWorkout();


  return (
    <div>
      <Link to='/calendar'>Back to Calendar</Link>
        Your daily workouts consist of:
        <ul>
          <li></li>
          <li></li>
        </ul>
        <Link to='/allworkouts'>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add new workout.
        </button>
        </Link>

    <ul>
      {workouts.map((workout) => <li key={workout.id}>{workout.name}</li>)}
      </ul>
    </div>
  );
}
