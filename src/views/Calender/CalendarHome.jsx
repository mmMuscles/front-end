import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import { Link } from "react-router-dom";
import CalenderList from "../../components/Calendar/CalenderList";
import { useWorkout } from "../../context/WorkoutContext";
import "./CalendarHome.css";
import 'react-calendar/dist/Calendar.css';
import { useLocation } from "react-router-dom";
import { getWorkoutsNoPage } from "../../services/wgerClient";
import { mungeDaily } from "../../utils/utils";
import { getWorkoutArray } from "../../services/supabaseClient";
import { useUser } from "../../context/UserContext";

export default function CalendarHome() {
  const [date, setDate] = useState(new Date());
  const { workouts} = useWorkout();
  const selectedDate = moment(date).format("YYYY-MM-DD");
  const location = useLocation();
  const locationDate = location.search.split('=')[1];
  const [ renderThese, setRenderThese] = useState([])
  const [ loading, setLoading ] = useState(true);
  const {user} = useUser()
  


  useEffect(() => {
    setLoading(true)
   const allWorkouts = async () => { 
   const retrievedData= await getWorkoutsNoPage();
   const dailyWorkout= await getWorkoutArray(selectedDate, user.id)     
   const dailyWorkId = dailyWorkout.map((object) =>+object.workouts)
   const needRender = mungeDaily(dailyWorkId, retrievedData)
    setRenderThese(needRender)
    
    setLoading(false)
  }
   allWorkouts();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [selectedDate])

  const handleData = (e) => {
    setDate(e);
  };
//  if(locationDate){ setDate(locationDate)};

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
          {loading? <h1 >.......LOainding</h1> : (
            <ul>
              {renderThese.map((workout) => (
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
