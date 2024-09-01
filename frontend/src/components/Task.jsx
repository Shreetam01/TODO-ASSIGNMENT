import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import "./task.css"

const Task = ({
  title,
  description,
  id,
  deleteHandeler,
  updateHandeler,
  isCompleted,
}) => {
  return (
    <div className="task">
      <div className="info">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="container">
        <input
          type="checkbox"
          onChange={() => {
            updateHandeler(id);
          }}
          checked={isCompleted}
        />
        <button
          onClick={() => {
            deleteHandeler(id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Task;
