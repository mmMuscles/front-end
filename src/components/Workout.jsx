import React from "react";
import Card from "./Card/Card";

export default function Workout({ name, description, category, onClick }) {
  return (
    <Card>
      <div>
        <h1 className="text-xl font-bold">{name}</h1>
        <p dangerouslySetInnerHTML={{ __html: description }}></p>
        <p>
          <b>Category:</b> {category}
        </p>
        <button
          onClick={onClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add
        </button>
      </div>
    </Card>
  );
}
