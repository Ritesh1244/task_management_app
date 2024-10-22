import React, { useState, useEffect } from "react";
import { RxCrossCircled } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { updateTask } from '../redux/slices/taskSlice';
import moment from 'moment'; // Import moment.js
import './update_data.css';

function UpdateTask({ onClose, currentTask }) {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        priority: "low",
        dueDate: "",
        completed: "No"
    });

    useEffect(() => {
        if (currentTask) {
            setFormData({
                title: currentTask.title,
                description: currentTask.description,
                priority: currentTask.priority,
                dueDate: moment(currentTask.dueDate).format('YYYY-MM-DD'), // Format to YYYY-MM-DD
                completed: currentTask.completed ? "Yes" : "No"
            });
        }
    }, [currentTask]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const updates = {
            title: formData.title,
            description: formData.description,
            priority: formData.priority,
            dueDate: moment(formData.dueDate).format('DD/MM/YYYY'), // Format for backend
            completed: formData.completed === "Yes",
        };

        console.log("Submitting update for task:", { taskId: currentTask._id, updates });

        dispatch(updateTask({ taskId: currentTask._id, updates }))
            .unwrap()
            .then(() => {
                console.log("Task updated successfully");
                onClose();
            })
            .catch((error) => {
                console.error("Failed to update task:", error);
            });
    };

    return (
        <div className="overlay">
            <div className="modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2>Update Task</h2>
                        <RxCrossCircled className="cross-icon" onClick={onClose} />
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                name="title"
                                className="input-title"
                                placeholder="Task Title"
                                value={formData.title}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea
                                name="description"
                                className="input-description"
                                placeholder="Task Description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="dueDate">Due Date</label>
                            <input
                                type="date"
                                name="dueDate"
                                className="input-date"
                                value={formData.dueDate}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="priority">Select Priority</label>
                            <select
                                name="priority"
                                className="input-priority"
                                value={formData.priority}
                                onChange={handleChange}
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="completed">Task Status</label>
                            <select
                                name="completed"
                                className="input-completed"
                                value={formData.completed}
                                onChange={handleChange}
                            >
                                <option value="Yes">Completed</option>
                                <option value="No">Incomplete</option>
                            </select>
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="btn-submit">Update Task</button>
                            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdateTask;
