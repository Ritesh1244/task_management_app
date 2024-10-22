import React, { useState } from "react";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from "../utils";
import styles from '../Style/Login.module.css';

function Login({ setIsAuthenticated }) {
    const [Logininfo, setLogininfo] = useState({
        email: '',
        password: '',
    });
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLogininfo((prevInfo) => ({ ...prevInfo, [name]: value }));
    };

    const handleToggle = () => {
        setIcon(type === 'password' ? eye : eyeOff);
        setType(type === 'password' ? 'text' : 'password');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = Logininfo;
    
        if (!email || !password) {
            return handleError('Email and password are required');
        }
    
        try {
            const response = await fetch('https://task-management-app-nu-seven.vercel.app/auth/Login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(Logininfo),
            });
            
            const result = await response.json();
    
            const { success, message, jwtToken, name, error } = result;
            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                setIsAuthenticated(true);  // Update authenticated status
                setTimeout(() => {
                    navigate('/home');
                }, 1000);
            } else if (error) {
                handleError(error?.details?.[0]?.message || "An unexpected error occurred");
            } else if (!success) {
                handleError(message);
            }
        } catch (error) {
            handleError(error.message || 'An error occurred during login');
        }
    };

    return (
        <div className={styles['login-container']}>
            <div className={styles['login-form']}>
                <h1>Login</h1>

                <form onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            onChange={handleChange}
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter Your email..."
                            value={Logininfo.email}
                        />
                    </div>

                    <div className={styles['password-container']}>
                        <label htmlFor="password">Password</label>
                        <div className={styles['password-input-wrapper']}>
                            <input
                                onChange={handleChange}
                                type={type}
                                name="password"
                                id="password"
                                placeholder="Enter Your password..."
                                value={Logininfo.password}
                            />
                            <span className={styles['icon-wrapper']} onClick={handleToggle}>
                                <Icon icon={icon} size={25} />
                            </span>
                        </div>
                    </div>

                    <button type="submit">Login</button>
                    <span style={{ marginLeft: '10px' }}> Don't have an account?
                        <Link to="/signup">Signup</Link>
                    </span>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
}

export default Login;
