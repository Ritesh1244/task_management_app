import React, { useState } from "react";
import { useSelector } from "react-redux";
import MainContent from "../../Components/MainContent";
import UpdateTask from "../../Components/update_data";
import '../../Style/Task/All_task.css'; // Import the same CSS file

function Pending_Task() {
    const tasks = useSelector((state) => state.tasks.taskList);
    const [showUpdateForm, setShowUpdateForm] = useState(false); // For showing/hiding update form
    const [taskToUpdate, setTaskToUpdate] = useState(null); // To hold the task being edited

    const pendingTasks = tasks.filter((task) => task.completed === false);

    // Function to open the Update Task form
    const openUpdateForm = (task) => {
        setTaskToUpdate(task); 
        setShowUpdateForm(true); 
    };

    // Function to close the form
    const closeForm = () => {
        setShowUpdateForm(false); // Hide the update form
        setTaskToUpdate(null); // Clear the selected task
    };

    return (
        <div>
            <div className="all-tasks-container">
                <h1>
                    <span className="underline-text">Pending Tasks</span>
                </h1>
            </div>

            {showUpdateForm ? (
                <UpdateTask onClose={closeForm} currentTask={taskToUpdate} />
            ) : (
                <>
                    {pendingTasks.length > 0 ? (
                        <MainContent
                            home={false}
                            data={pendingTasks}
                            handleOpenUpdateForm={openUpdateForm} 
                        />
                    ) : (
                        <p>No pending tasks to show</p>
                    )}
                </>
            )}
        </div>
    );
}

export default Pending_Task;
