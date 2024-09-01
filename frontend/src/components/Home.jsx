import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Task from "./Task";
import { context, server } from "../index";
import { Navigate } from "react-router-dom";
import "./Home.css"

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [task, setTask] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(context);

  const deleteHandler = async (id) => {
    try {
      const response = await fetch(`${server}/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        setRefresh((prev) => !prev); // Trigger re-fetch after deletion
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("An error occurred while deleting the task.");
    }
  };

  const updateHandler = async (id) => {
    try {
      const response = await fetch(`${server}/${id}`, {
        method: "PUT",
        credentials: "include",
      });
      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        setRefresh((prev) => !prev); 
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("An error occurred while updating the task.");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${server}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
        credentials: "include",
      });
      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        setTitle("");
        setDescription("");
        setRefresh((prev) => !prev); 
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("An error occurred while adding the task.");
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${server}/all`, {
          credentials: "include",
        });
        const data = await response.json();

        if (response.ok) {
          setTask(data.task);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error("An error occurred while fetching tasks.");
      }
    };

    fetchTasks();
  }, [refresh]); 

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="home">
      <h1>Todo App</h1>

      <div className="container">
        <h2>Getting Things Done</h2>

        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Task Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button type="submit">Add Task</button>
        </form>
      </div>

      <div className="taskList">
        {task?.map((item) => (
          <Task
            key={item?._id}
            title={item?.title}
            description={item?.description}
            id={item?._id}
            deleteHandler={deleteHandler}
            updateHandler={updateHandler}
            isCompleted={item?.isCompleted}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
