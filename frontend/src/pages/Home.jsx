import React from "react";
import { Outlet } from 'react-router-dom';
import styles from "../Style/Home.module.css"; 
import Sidebar from "../Components/Sidebar"; 

function Home() {
  return (
    <div className={styles['Home-container']}>
      <div className={styles['Home-container1']}>
        <Sidebar />
      </div>
      <div className={styles['Home-container2']}>
        {/* This will render the content based on the selected task */}
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
