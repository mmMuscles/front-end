import React from "react";
import { useState } from "react/cjs/react.development";

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
  const [workout, setWorkout] = useState([]);

  return (
    <div>
      <select className="dropdown">
        <option value={workoutList}></option>
      </select>
    </div>
  );
}
