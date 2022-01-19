import React, { useState } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import CalenderList from "../../views/Calender/CalenderList";
import { useWorkout } from "../../context/WorkoutContext";

export default function CalendarHome() {
  const [date, setDate] = useState(new Date());
  const {workouts} = useWorkout();

  const handleData = (e) => {
    setDate(e);
  };

  return (
    <>
      <Calendar value={date} onChange={handleData} />
      Workout for <b>{moment(date).format("MMMM Do YYYY")}</b>
      <p>Today's focus section is: {<CalenderList />}</p>
      Your daily workouts consist of:
      <ul>
        {workouts.map((workout) => <li>{workout.name}</li>)}
      </ul>
      <Link to="/calendarday">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Adjust Your Day.
        </button>
      </Link>
    </>
  );
}
