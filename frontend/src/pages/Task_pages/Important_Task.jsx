import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImportantTask } from "../../redux/slices/taskSlice";
import MainContent from "../../Components/MainContent";
import UpdateTask from "../../Components/update_data"; // Import UpdateTask component
import '../../Style/Task/All_task.css'; // Import the same CSS file

function Important_Task() {
    const dispatch = useDispatch();
    const importantTasks = useSelector((state) => state.tasks.importantTasks); // Get important tasks from Redux

    // State for showing/hiding the update form and the task to be updated
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [taskToUpdate, setTaskToUpdate] = useState(null);

    // Fetch important tasks when the component mounts
    useEffect(() => {
        dispatch(ImportantTask());
    }, [dispatch]);

    // Function to open the Update Task form
    const openUpdateForm = (task) => {
        setTaskToUpdate(task); // Set the task to update
        setShowUpdateForm(true); // Show the update form
    };

    // Function to close the update form
    const closeForm = () => {
        setShowUpdateForm(false); // Hide the form
        setTaskToUpdate(null); // Reset the task being updated
    };

    return (
        <div>
            <div className="all-tasks-container">
                <h1>
                    <span className="underline-text">Important Tasks</span>
                </h1>
            </div>

            {/* If a task is selected for updating, show the UpdateTask form */}
            {showUpdateForm ? (
                <UpdateTask onClose={closeForm} currentTask={taskToUpdate} />
            ) : (
                <>
                    {importantTasks.length > 0 ? (
                        <MainContent
                            home={false}
                            data={importantTasks}
                            handleOpenUpdateForm={openUpdateForm} // Pass the function to MainContent
                        />
                    ) : (
                        <p>No important tasks to show</p>
                    )}
                </>
            )}
        </div>
    );
}

export default Important_Task;
