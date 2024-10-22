import React, { useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { createTask } from '../redux/slices/taskSlice'
import './Input_data.css';

function InputData({ onClose }) {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        priority: "low",
        dueDate: "",
        completed: "No"
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted with data:", formData); // Log form data
    
        // Convert the due date from YYYY-MM-DD to DD/MM/YYYY
        const dueDateParts = formData.dueDate.split('-');
        const formattedDueDate = `${dueDateParts[2]}/${dueDateParts[1]}/${dueDateParts[0]}`;
    
        const newTask = {
            title: formData.title,
            description: formData.description,
            priority: formData.priority,
            dueDate: formattedDueDate,
            completed: formData.completed === "Yes",
        };
    
        dispatch(createTask(newTask)); // Dispatch the action to create a new task
        onClose(); // Close the modal after creation
    };

    return (
        <div className="overlay">
            <div className="modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 style={{ float: 'left' }}>Create New Task</h2>
                        <RxCrossCircled 
                            className="cross-icon" 
                            style={{ float: 'right', cursor: 'pointer', fontSize: '24px' }} 
                            onClick={onClose} 
                        />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input 
                                type="text" 
                                placeholder="Task Title" 
                                name="title" 
                                className="input-title" 
                                onChange={handleInputChange} 
                                value={formData.title}
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea 
                                placeholder="Task Description" 
                                name="description" 
                                className="input-description" 
                                onChange={handleInputChange} 
                                value={formData.description}
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="priority">Select Priority</label>
                            <select 
                                name="priority" 
                                className="input-priority" 
                                onChange={handleInputChange} 
                                value={formData.priority}
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="dueDate">Due Date</label>
                            <input 
                                type="date" 
                                name="dueDate" 
                                className="input-date" 
                                onChange={handleInputChange} 
                                value={formData.dueDate}
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="completed">Task Completed</label>
                            <select 
                                name="completed" 
                                className="input-completed" 
                                onChange={handleInputChange} 
                                value={formData.completed}
                            >
                                <option value="No">No</option>
                                <option value="Yes">Yes</option>
                            </select>
                        </div>
                        <div className="form-actions">
                            <button type="submit" className="btn-submit">Create Task</button>
                            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default InputData;
