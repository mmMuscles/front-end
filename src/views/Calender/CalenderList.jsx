import React from "react";

const themeList = [
  "Rest",
  "Legs",
  "Arms",
  "Cardio",
  "Core",
  "Strength",
  "Yoga",
  "Stretching",
];
export default function CalenderList() {
  return (
    <>
    
      <select className="dropdown">
        {themeList.map((theme) => {
          return (
            <option key={theme} value={theme}>
              {theme}
            </option>
          );
        })}
      </select>
    </>
  );
}
