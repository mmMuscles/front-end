import React from "react";
import { useState } from "react/cjs/react.development";

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
