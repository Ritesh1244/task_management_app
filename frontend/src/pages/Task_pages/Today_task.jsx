import React, { useState } from "react";
import { useSelector } from "react-redux";
import MainContent from "../../Components/MainContent";
import UpdateTask from "../../Components/update_data"; 
import '../../Style/Task/All_task.css'; // Import the same CSS file

function Today_Task() {
    const tasks = useSelector((state) => state.tasks.taskList); 

    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [taskToUpdate, setTaskToUpdate] = useState(null);

    const getTodayTasks = () => {
        const now = new Date();
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Midnight today
        const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1); // Midnight tomorrow
        return tasks.filter((task) => {
            const dueDate = new Date(task.dueDate);
            return dueDate >= startOfToday && dueDate < endOfToday;
        });
    };

    const todayTasks = getTodayTasks(); 

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
                    <span className="underline-text">Today's Tasks</span>
                </h1>
            </div>

            {showUpdateForm ? (
                <UpdateTask onClose={closeForm} currentTask={taskToUpdate} />
            ) : (
                <>
                    {todayTasks.length > 0 ? (
                        <MainContent
                            home={false}
                            data={todayTasks}
                            handleOpenUpdateForm={openUpdateForm} 
                        />
                    ) : (
                        <p>No tasks due today</p>
                    )}
                </>
            )}
        </div>
    );
}

export default Today_Task;
