import React, { useState } from "react";
import { useSelector } from "react-redux";
import MainContent from "../../Components/MainContent";
import UpdateTask from "../../Components/update_data";
import '../../Style/Task/All_task.css'; // Import the same CSS file

function Completed_task() {
    const tasks = useSelector((state) => state.tasks.taskList);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [taskToUpdate, setTaskToUpdate] = useState(null);

    const completedTasks = tasks.filter((task) => task.completed === true);

    const openUpdateForm = (task) => {
        setTaskToUpdate(task);
        setShowUpdateForm(true);
    };

    const closeForm = () => {
        setShowUpdateForm(false);
        setTaskToUpdate(null); // Clear the selected task
    };

    return (
        <div>
            <div className="all-tasks-container">
                <h1><span className="underline-text">Completed Tasks</span></h1>
                <div className="filter-buttons">
                    {/* Add filter buttons here if needed */}
                </div>
            </div>

            {/* Conditional rendering of forms */}
            {showUpdateForm ? (
                <UpdateTask onClose={closeForm} currentTask={taskToUpdate} />
            ) : (
                <>
                    {completedTasks.length > 0 ? (
                        <MainContent
                            home={false}
                            data={completedTasks}
                            handleOpenUpdateForm={openUpdateForm}
                        />
                    ) : (
                        <p>No completed tasks to show</p>
                    )}
                </>
            )}
        </div>
    );
}

export default Completed_task;
