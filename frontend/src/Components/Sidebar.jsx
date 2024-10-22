import React, { useState, useEffect } from "react";
import axios from 'axios'; 
import { useNavigate } from "react-router-dom";
import { TbNotes } from "react-icons/tb";
import { FaTasks, FaCheckCircle, FaCalendarAlt, FaExclamationCircle } from "react-icons/fa";
import { IoMdToday } from "react-icons/io";

import './sidebar.css';

function Sidebar() {
    const [LoginedUser, SetLoginedUser] = useState("");
    const navigate = useNavigate();

    const data = [
        { title: "All Tasks", icon: <TbNotes />, link: "/home" }, // Default home (index route)
        { title: "Important Tasks", icon: <FaTasks />, link: "/home/important-tasks" },
        { title: "Completed Tasks", icon: <FaCheckCircle />, link: "/home/completed-tasks" },
        { title: "Upcoming Tasks", icon: <FaCalendarAlt />, link: "/home/upcoming-tasks" },
        { title: "Pending Tasks", icon: <FaExclamationCircle />, link: "/home/pending-tasks" },
        { title: "Today Task", icon: <IoMdToday />, link: "/home/today" }
    ];

    useEffect(() => {
        const user = localStorage.getItem("loggedInUser");
        SetLoginedUser(user ? user : 'Guest');
    }, []);

//================================fetching all tasks from backend =================================
    // useEffect(() => {
    //     const fetchTasks = async () => {
    //         try {
    //             const token = localStorage.getItem("token");
                
    //             // Send GET request with the Authorization header
    //             const response = await axios.get("http://localhost:3000/task/alltasks", {
    //                 headers: {
    //                     Authorization: token // Pass the token in the Authorization header
    //                 }
    //             });
    
    //             // Log the response
    //             console.log(response.data.tasks);
    //             console.log(response.data.tasks[0]._id);
    
    //             // Check the response data and set tasks state
    //             // if (response.data.tasks) {
    //             //     setTasks(response.data.tasks);
    //             // } else {
    //             //     console.log("No tasks found");
    //             // }
    //         } catch (error) {
    //             console.error("Error fetching tasks:", error);
    //         }
    //     };
    
    //     fetchTasks();
    // }, []);
    
//======================================================================================
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("loggedInUser");
        setTimeout(() => {
            navigate("/login");
        }, 1000);
    };

    return (
        <div className="sidebar-container">
            <div className="sidebar-content">
                <h1>{LoginedUser}</h1>
                <div className="items-container">
                    {data.map((item, index) => (
                        <div 
                            key={index} 
                            className="items-title" 
                            onClick={() => navigate(item.link)}  // Navigate to the respective route
                        >
                            {item.icon && <span className="item-icon">{item.icon}</span>}
                            <span>{item.title}</span>
                        </div>
                    ))}
                </div>
            </div>

            <footer className="sidebar-footer">
                <button onClick={handleLogout}>Logout</button>
            </footer>
        </div>
    );
}

export default Sidebar;
