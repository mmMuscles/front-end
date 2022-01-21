import React, { useState } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import { Link } from "react-router-dom";
import CalenderList from "../../views/Calender/CalenderList";
import { useWorkout } from "../../context/WorkoutContext";
import "./CalendarHome.css";
import "react-calendar/dist/Calendar.css";

export default function CalendarHome() {
  const [date, setDate] = useState(new Date());
  const { workouts } = useWorkout();
  const selectedDate = moment(date).format("YYYY-MM-DD");

  const handleData = (e) => {
    setDate(e);
  };

  return (
    <main className="date-day bg-gray-800 h-screen">
      <Calendar
        showNavigation={false}
        className="m-10 h-64 rounded-md"
        value={date}
        onChange={handleData}
      />
      <section className="text-white mt-10 text-2xl">
        {/* My workout for <b>{selectedDate}</b> */}
        <p>Today I'm going to focus on {<CalenderList />}</p>
        {!workouts ? (
          <Link to={`/allworkouts?date=${selectedDate}`}>
            <button className="bg-gray-700 hover:bg-yellow-600 text-white font-bold text-sm py-2 px-4 rounded">
              add Workouts
            </button>
          </Link>
        ) : (
          <Link to={`/allworkouts?date=${selectedDate}`}>
            <button className="bg-gray-700 hover:bg-yellow-600 text-white font-bold text-sm py-2 px-4 rounded">
              add workouts
            </button>
          </Link>
        )}
        {!workouts ? (
          <p>'I have no workouts today.'</p>
        ) : (
          <div>
            {" "}
            I'm going to do:
            {workouts && (
              <ul>
                {workouts.map((workout) => (
                  <li key={workout.id}>{workout.name}</li>
                ))}
              </ul>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
