import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { MdDeleteForever, MdEdit, MdClose } from "react-icons/md";
import { IoMdSave } from "react-icons/io";
import { FaSyncAlt } from "react-icons/fa";
const TaskList = ({ handleLoading, darkTheme }) => {
  const [tasks, setTasks] = useState([]);
  const [editedTask, setEditedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rotating, setRotating] = useState(false);
 
  const handleClick = () => {
    setRotating(true);
    fetchTasks();
    setTimeout(() => setRotating(false), 2000);
  };

  const fetchTasks = () => {
    handleLoading(true);
    fetch("https://curd-g5va.onrender.com/api/tasks")
      .then((response) => response.json())
      .then((data) => {
        const formattedTasks = data.map((task) => ({
          ...task,
          formattedCreatedAt: new Date(task.createdAt).toLocaleString(),
        }));
        setTasks(formattedTasks);
        handleLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        handleLoading(false);
      });
  };

  const deleteTask = (taskId) => {
    const originalTasks = [...tasks];
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));

    fetch(`https://curd-g5va.onrender.com/api/tasks/${taskId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          setTasks(originalTasks);
          console.error("Error deleting task:", response.statusText);
        }
      })
      .catch((error) => {
        setTasks(originalTasks);
        console.error("Error deleting task:", error);
      });
  };

  const editTask = (task) => {
    setEditedTask(task);
    setIsModalOpen(true);
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();
    if (editedTask) {
      fetch(`https://curd-g5va.onrender.com/api/tasks/${editedTask._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedTask),
      })
        .then((response) => {
          if (response.ok) {
            setTasks((prevTasks) =>
              prevTasks.map((task) =>
                task._id === editedTask._id ? editedTask : task
              )
            );
            setIsModalOpen(false);
          } else {
            console.error("Error updating task:", response.statusText);
          }
        })
        .catch((error) => console.error("Error updating task:", error));
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);



return (
  <>
    <div className="flex flex-wrap bg-transparent w-[90vw] md:w-[80vw] lg:w-[60vw] h-max p-5 mx-auto">
      {tasks.map((task) => (
        <div
          className={`relative h-[25vh] w-full md:w-[48%] lg:w-[30%] xl:w-[16vw] m-[10px] md:m-[15px] lg:m-[20px] p-3 rounded-[20px] transition-all duration-200 ease-linear ${
            darkTheme
              ? "bg-[#1e1e1e] shadow-[8px_8px_24px_#000000,-6px_-6px_12px_#4d4d4d] text-white hover:translate-y-[-5px] hover:shadow-[0_4px_8px_rgba(0,0,0,0.2)]"
              : "bg-[#f0f0f0] shadow-[4px_4px_10px_rgb(90,90,90),-4px_-4px_10px_rgb(255,255,255)] text-[#333] hover:translate-y-[-5px] hover:shadow-[4px_4px_8px_rgba(247,247,247,0.705),inset_-6px_-6px_10px_rgba(36,36,36,0.534)]"
          }`}
          key={task._id}
        >
          <h2 className="text-base mb-2.5 text-2xl">{task.title}</h2>
          <div className="text-sm">
            <p className="text-[1rem] mx-0 my-[5px]">
              <strong>Reps:</strong> {task.reps}
            </p>
            <p className="text-[1rem] mx-0 my-[5px]">
              <strong>Load:</strong> {task.load}
            </p>
            <p className="text-[1rem] mx-0 my-[5px]">
              <strong>User ID:</strong> {task.user_id}
            </p>
            <p className="text-[1rem] mx-0 my-[5px]  ">
              <strong>Created:</strong> {task.formattedCreatedAt}
            </p>
          </div>
          <div className="absolute flex gap-2.5 right-2.5 top-2.5">
            <button
              className={`p-2.5 rounded-full border-none transition-all duration-200 ease-linear ${
                darkTheme
                  ? "bg-transparent text-[#ff0000] hover:bg-[#ff0000] hover:text-white shadow-[inset_4px_4px_6px_#424242,inset_-4px_-4px_6px_#3a3a3a,6px_6px_12px_#030303,-6px_-6px_12px_#222222]"
                  : "bg-white text-[#ff0000] hover:bg-[#ffcccc] shadow-[2px_2px_4px_rgba(0,0,0,0.1)]"
              }`}
              onClick={() => deleteTask(task._id)}
            >
              <MdDeleteForever className="delete-icon" />
            </button>
            <button
              className={`p-2.5 rounded-full border-none transition-all duration-200 ease-linear ${
                darkTheme
                  ? "bg-transparent text-[#007bff] hover:bg-[#007bff] hover:text-white shadow-[inset_4px_4px_6px_#424242,inset_-4px_-4px_6px_#3a3a3a,6px_6px_12px_#030303,-6px_-6px_12px_#222222]"
                  : "bg-white text-[#007bff] hover:bg-[#cce5ff] shadow-[2px_2px_4px_rgba(0,0,0,0.1)]"
              }`}
              onClick={() => editTask(task)}
            >
              <MdEdit className="edit-icon" />
            </button>
          </div>
        </div>
      ))}
      {isModalOpen && editedTask && (
        <div className={darkTheme?"fixed w-full h-full flex justify-center items-center z-[9999] bg-[rgba(0,0,0,0.75)]":"fixed w-full h-full flex justify-center items-center z-[9999] bg-[rgba(250,250,250,0.75)]"}>
          <div className={darkTheme?"w-[90%] max-w-[400px] p-4 rounded-lg bg-[#1e1e1e] shadow-lg text-white":"w-[90%] max-w-[400px] p-4 rounded-lg bg-white shadow-lg text-[#1e1e1e]"}>
            <div className="modal-header flex justify-between items-center mb-4">
              <h3 className="modal-title">Edit Task</h3>
              <button
                className={darkTheme?"bg-transparent text-white hover:text-[#ff0000] border-none":"bg-transparent text-black hover:text-green-400 border-none"}
                onClick={() => setIsModalOpen(false)}
              >
                <MdClose className="" />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="flex flex-col gap-2.5">
              <div className="form-group">
                <label htmlFor="title">Title: </label>
                <input
                  className={darkTheme?"rounded w-full p-2 border-none bg-[#1e1e1e] text-white shadow-inner focus:outline-none":"rounded w-full p-2 border-none bg-white text-[#1e1e1e] shadow-inner focus:outline-none"}
                  type="text"
                  id="title"
                  value={editedTask.title}
                  onChange={(e) =>
                    setEditedTask({ ...editedTask, title: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="reps">Reps:</label>
                <input
                  className={darkTheme?"rounded w-full p-2 border-none bg-[#1e1e1e] text-white shadow-inner focus:outline-none":"rounded w-full p-2 border-none bg-white text-[#1e1e1e] shadow-inner focus:outline-none"}
                  type="number"
                  id="reps"
                  value={editedTask.reps}
                  onChange={(e) =>
                    setEditedTask({
                      ...editedTask,
                      reps: parseInt(e.target.value, 10),
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="load">Load:</label>
                <input
                  className={darkTheme?"rounded w-full p-2 border-none bg-[#1e1e1e] text-white shadow-inner focus:outline-none":"rounded w-full p-2 border-none bg-white text-[#1e1e1e] shadow-inner focus:outline-none"}
                  type="number"
                  id="load"
                  value={editedTask.load}
                  onChange={(e) =>
                    setEditedTask({
                      ...editedTask,
                      load: parseInt(e.target.value, 10),
                    })
                  }
                />
              </div>
              <button
                type="submit"
                className={darkTheme?"bg-[#007bff] text-white px-4 py-2 rounded-lg hover:bg-[#0056b3] border-none":"bg-trasparent text-[#007bff] px-4 py-2 rounded-lg hover:bg-[#90cbfba8] hover: border-none"}
              >
                <IoMdSave />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
    <div className="flex justify-center mt-5">
      <button
        onClick={handleClick}
        className={`p-3 h-max w-max rounded-full border-none transition-all duration-200 ease-linear ${
          darkTheme
            ? "bg-transparent text-white hover:shadow-[4px_4px_6px_#202020,-4px_-4px_6px_#2b2b2b] shadow-[inset_6px_6px_12px_#424242,inset_-2px_-2px_6px_#3a3a3a,6px_6px_12px_#030303,-6px_-6px_12px_#222222]"
            : "bg-transparent text-[#f09] hover:bg-[rgba(255,0,153,0.24)] shadow-[6px_6px_12px_#cbced1,-6px_-6px_12px_#ffffff]"
        }`}
      >
        <FaSyncAlt className={`${rotating ? "rotate" : ""}`} />
      </button>
    </div>
  </>
);
};
TaskList.propTypes = {
  handleLoading: PropTypes.func.isRequired,
  darkTheme: PropTypes.bool.isRequired,
};

export default TaskList;
