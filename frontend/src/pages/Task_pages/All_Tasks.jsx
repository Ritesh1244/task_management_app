import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../../redux/slices/taskSlice"; // Import the fetchTasks action
import MainContent from "../../Components/MainContent";
import { IoIosAddCircle } from "react-icons/io";
import '../../Style/Task/All_task.css'; 
import InputData from "../../Components/Input_data";
import UpdateTask from "../../Components/update_data"; 

function All_Tasks() {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks.taskList); // Access tasks from Redux state
    const taskStatus = useSelector((state) => state.tasks.status);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [taskToUpdate, setTaskToUpdate] = useState(null);

    // Fetch tasks from Redux when component mounts
    useEffect(() => {
        if (taskStatus === 'idle') {
            dispatch(fetchTasks()); // Fetch tasks from the backend
        }
    }, [dispatch, taskStatus]);

    // Function to open the Add Task form
    const openAddForm = () => {
        setShowAddForm(true);
        setShowUpdateForm(false);
    };

    // Function to open the Update Task form
    const openUpdateForm = (task) => {
        setTaskToUpdate(task); 
        setShowUpdateForm(true); 
        setShowAddForm(false); 
    };

    // Function to close both forms
    const closeForms = () => {
        setShowAddForm(false);
        setShowUpdateForm(false);
        setTaskToUpdate(null);
    };

    

    return (
        <div>
            <div className="all-tasks-container">
                <h1><span className="underline-text">All Your Tasks</span></h1>
                <div className="filter-buttons">
                    {/* <button>Low</button>
                    <button>Medium</button>
                    <button>High</button> */}
                </div>
                <div className="add-task-container" onClick={openAddForm}>
                    <IoIosAddCircle />
                    <span>Add a new Task</span>
                </div>
            </div>

            {/* Check loading status and error */}
            {taskStatus === 'loading' && <p>Loading tasks...</p>}
            {taskStatus === 'failed' && <p>Error fetching tasks. Please try again.</p>}

            {/* Main content displaying tasks */}
            <MainContent 
                home={'true'} 
                handleOpenForm={openAddForm} 
                handleOpenUpdateForm={openUpdateForm} 
                data={tasks} 
            />

            {/* Conditional rendering of forms */}
            {showAddForm && <InputData onClose={closeForms} />}
            {showUpdateForm && (
                <UpdateTask 
                    onClose={closeForms} 
                    currentTask={taskToUpdate} 
                />
            )}
        </div>
    );
}

export default All_Tasks;