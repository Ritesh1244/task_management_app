import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleImportant, toggleCompletion, deleteTask, fetchTasks } from '../redux/slices/taskSlice';
import { FaHeart, FaRegHeart, FaEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import './MainContent.css';

function MainContent({ home, handleOpenForm, handleOpenUpdateForm, data }) {
    const dispatch = useDispatch();


    const tasksToRender = data 

    const toggleTaskImportance = (task) => {
        dispatch(toggleImportant(task._id)); // Dispatch Redux action
    };

    const toggleTaskCompletion = (task) => {
        dispatch(toggleCompletion(task._id)); // Dispatch Redux action
    };

    const deleteTaskItem = (taskId) => {
        dispatch(deleteTask(taskId)); // Dispatch Redux action
    };

    const calculateDueDate = (dueDate) => {
        const due = new Date(dueDate);
        const now = new Date();
        const timeDifference = due - now;
        const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

        if (daysDifference === 0) {
            return "Today";
        } else if (daysDifference === 1) {
            return "Tomorrow";
        } else if (daysDifference > 0) {
            return `In ${daysDifference} days`;
        } else {
            return `${Math.abs(daysDifference)} days ago`;
        }
    };

    return (
        <div className="main-content">
            {tasksToRender.length > 0 ? (
                tasksToRender.map((task) => (
                    <div className="task-item" key={task._id}>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <div className="task-button">
                            <button
                                onClick={() => toggleTaskCompletion(task)}
                                style={{
                                    backgroundColor: task.completed ? "green" : "red",
                                    color: "white",
                                }}
                            >
                                {task.completed ? "Completed" : "Incomplete"}
                            </button>

                            {/* Displaying the calculated due date */}
                            <p>{calculateDueDate(task.dueDate)}</p>
                            <div className="task-action">
                                <button onClick={() => toggleTaskImportance(task)} className="icon-button">
                                    {task.important ? (
                                        <FaHeart className="icon filled" style={{ color: "red" }} />
                                    ) : (
                                        <FaRegHeart className="icon" />
                                    )}
                                </button>
                                <button className="icon-button" onClick={() => handleOpenUpdateForm(task)}>
                                    <FaEdit />
                                </button>
                                <button className="icon-button" onClick={() => deleteTaskItem(task._id)}>
                                    <MdDeleteSweep className="delete-icon" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No tasks found</p>
            )}

            {home === 'true' && (
                <div className="task-item add-task-item" onClick={handleOpenForm}>
                    <IoIosAddCircle className="add-icon" />
                    <h2 className="add-task">Add Task</h2>
                </div>
            )}
        </div>
    );
}

export default MainContent;