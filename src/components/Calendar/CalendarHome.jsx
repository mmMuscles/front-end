import React, { useState } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import { Link } from "react-router-dom";
import CalenderList from "../../views/Calender/CalenderList";
import { useWorkout } from "../../context/WorkoutContext";

export default function CalendarHome() {
  const [date, setDate] = useState(new Date());
  const { workouts } = useWorkout();
  const selectedDate = moment(date).format("YYYY-MM-DD");

  const handleData = (e) => {
    setDate(e);
  };

  return (
    <>
      <Calendar value={date} onChange={handleData} />
      Workout for <b>{selectedDate}</b>
      <p>Today's focus section is: {<CalenderList />}</p>
      {!workouts ? (
        <p>'You have no workouts scheduled for today!'</p>
      ) : (
        <div>
          {" "}
          Your daily workouts consist of
          {workouts && (
            <ul>
              {workouts.map((workout) => (
                <li key={workout.id}>{workout.name}</li>
              ))}
            </ul>
          )}
        </div>
      )}
      {!workouts ? (
        <Link to={`/allworkouts?date=${selectedDate}`}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add Workouts
          </button>
        </Link>
      ) : (
        <Link to={`/allworkouts?date=${selectedDate}`}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add more workouts
          </button>
        </Link>
      )}
    </>
  );
}
