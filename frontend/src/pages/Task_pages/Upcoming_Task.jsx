import React, { useState } from "react";
import { useSelector } from "react-redux";
import MainContent from "../../Components/MainContent";
import UpdateTask from "../../Components/update_data"; 
import '../../Style/Task/All_task.css'; // Import the same CSS file

function Upcoming_Task() {
    const tasks = useSelector((state) => state.tasks.taskList); 

    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [taskToUpdate, setTaskToUpdate] = useState(null);

    const getUpcomingTasks = () => {
        const now = new Date();
        return tasks.filter((task) => {
            const dueDate = new Date(task.dueDate);
            return dueDate > now; 
        });
    };

    const upcomingTasks = getUpcomingTasks(); 

    const openUpdateForm = (task) => {
        setTaskToUpdate(task); 
        setShowUpdateForm(true); 
    };

    const closeForm = () => {
        setShowUpdateForm(false); 
        setTaskToUpdate(null);
    };

    return (
        <div>
            <div className="all-tasks-container">
                <h1>
                    <span className="underline-text">Upcoming Tasks</span>
                </h1>
            </div>

            {showUpdateForm ? (
                <UpdateTask onClose={closeForm} currentTask={taskToUpdate} />
            ) : (
                <>
                    {upcomingTasks.length > 0 ? (
                        <MainContent
                            home={false}
                            data={upcomingTasks}
                            handleOpenUpdateForm={openUpdateForm} 
                        />
                    ) : (
                        <p>No upcoming tasks to show</p>
                    )}
                </>
            )}
        </div>
    );
}

export default Upcoming_Task;
