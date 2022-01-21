import React from "react";
import './CalendarList.css'

const themeList = [
  "Rest",
  "Legs",
  "Arms",
  "Cardio",
  "Core",
  "Strength",
  "Yoga",
  "Stretch",
];
export default function CalenderList( {selectedDate} ) {
  const handleChange = () => {
    
  }
  return (
      <select onChange={handleChange}className="bg-none bg-transparent text-yellow-500 font-bold">
        {themeList.map((theme) => {
          return (
            <option key={theme} value={theme}>
              {theme}
            </option>
          );
        })}
      </select>
  );
}