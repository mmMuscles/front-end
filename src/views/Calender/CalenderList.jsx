import React from "react";

const workoutList = [
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
    <div>
      <select className="dropdown">
        <option value={workoutList}></option>
      </select>
    </div>
  );
}
