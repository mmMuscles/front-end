import React from "react";

const themeList = [
  "Rest",
  'Abs', 'Arms', 'Back', 'Calves', 'Chest', 'Legs', 'Shoulders',
  "Yoga",
  "Stretch",
];
export default function CalenderList( { handleChange, todaysTheme} ) {

  
  return (
      <select value={todaysTheme} onChange={(e) => handleChange(e.target.value)} className="bg-none bg-transparent text-yellow-500 font-bold">
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