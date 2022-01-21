import React from "react";

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
export default function CalenderList( { handleChange, todaysTheme} ) {

  
  return (
      <select onChange={(e) => handleChange(e.target.value)}className="bg-none bg-transparent text-yellow-500 font-bold">
        {themeList.map((theme) => {
          return (
             <option key={theme} value={theme}>
              {theme}
            </option>
          );
        })}
        {console.log(todaysTheme)}
      </select>
  );
}