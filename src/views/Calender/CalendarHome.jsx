import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import { Link } from "react-router-dom";
import CalenderList from "../../components/Calendar/CalenderList";
import "./CalendarHome.css";
import 'react-calendar/dist/Calendar.css';
import { mungeDaily } from "../../utils/utils";
import { getThemeArray, getWorkoutArray } from "../../services/supabaseClient";
import { useUser } from "../../context/UserContext";
import { data } from "../../assets/data";

export default function CalendarHome() {
  const [date, setDate] = useState(new Date());
  const selectedDate = moment(date).format("YYYY-MM-DD");
  const [ renderThese, setRenderThese] = useState([])
  const [ loading, setLoading ] = useState(true);
  const {user} = useUser();
  const [ theme, setTheme] = useState('');
  const [ todaysTheme, setTodayTheme] = useState('');
  
  const handleChange = (value) => {
    setTheme(value)
  }
  
  useEffect(() => {
    setLoading(true)
    const allWorkouts = async () => { 
      const retrievedData= data;
      const dailyWorkout= await getWorkoutArray(selectedDate, user.id) 
      const getThemes = await getThemeArray(selectedDate, user.id)    
      const todayTheme = getThemes.map((object) => object.theme)
      setTodayTheme(todayTheme[0])
      
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

  return (
    <main className='date-day bg-gray-800'>
      <Calendar showNavigation={false} className='calendar-picker mt-36 h-64 rounded-md' value={date} onChange={handleData} />
      <section className='text-white mt-36 mb-9 text-2xl'>
      
      <p>Today I'm going to focus on {<CalenderList todaysTheme={todaysTheme} handleChange={handleChange} selectedDate={selectedDate} />}</p>
      {!renderThese.length ? (
        <Link to={`/allworkouts?date=${selectedDate}&${theme}`}>
          <button className="bg-gray-700 hover:bg-yellow-600 text-white font-bold text-sm py-2 px-4 rounded">
            add workouts
          </button>
        </Link>
      ) : (
        <Link to={`/allworkouts?date=${selectedDate}&${theme}`}>
          <button className="bg-gray-700 hover:bg-yellow-600 text-white font-bold text-sm py-2 px-4 rounded">
            edit workouts
          </button>
        </Link>
      )}
      {!renderThese.length ? (
        <p>I have no workouts today.</p>
      ) : (
        <>
          <div>I'm going to do:</div>
          {loading? <h1 >.......Loading</h1> :(
            <ul>
              {renderThese.map((workout) => (
                <li key={workout.id}>
                  <button className='mt-2 text-yellow-500'>{workout.name}</button>
                  <p className='text-sm w-1/2 leading-relaxed' dangerouslySetInnerHTML={{__html: workout.description}}></p>
                  </li>
              ))}
            </ul>
          )}
        </>
      )}
      </section>
    </main>
  );
}
