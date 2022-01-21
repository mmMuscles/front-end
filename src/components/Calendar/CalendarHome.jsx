import React, { useState } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import { Link } from "react-router-dom";
import CalenderList from "../../views/Calender/CalenderList";
import { useWorkout } from "../../context/WorkoutContext";
import "./CalendarHome.css";
import 'react-calendar/dist/Calendar.css';

export default function CalendarHome() {
  const [date, setDate] = useState(new Date());
  const { workouts } = useWorkout();
  const selectedDate = moment(date).format("YYYY-MM-DD");

  const handleData = (e) => {
    setDate(e);
  };

  return (
    <main className='date-day bg-gray-800 h-screen'>
      <Calendar showNavigation={false} className='m-10 h-64 rounded-md' value={date} onChange={handleData} />
      <section className='text-white mt-10 text-2xl'>
      {/* My workout for <b>{selectedDate}</b> */}
      <p>Today I'm going to focus on {<CalenderList />}</p>
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
      {!workouts ? (
        <p>'You have no workouts scheduled for today!'</p>
      ) : (
        <div>
          {" "}
          Your daily workouts consist of
          {workouts && (
            <ul>
              {workouts.map((workout) => (
                <li>{workout.name}</li>
              ))}
            </ul>
          )}
        </div>
      )}
      </section>
    </main>
  );
}
