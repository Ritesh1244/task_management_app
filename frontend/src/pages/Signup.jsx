import React, { useState } from "react";
import { Icon } from "react-icons-kit";  
import { eyeOff } from "react-icons-kit/feather/eyeOff";  
import { eye } from "react-icons-kit/feather/eye"; 
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import styles from "../Style/Signup.module.css"; // Change to module CSS
import { handleError, handleSuccess } from "../utils";

function Signup() {
    const [signupinfo, setSignupinfo] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupinfo({ ...signupinfo, [name]: value });
    };

    const handleToggle = () => {
        if (type === 'password') {
            setIcon(eye);
            setType('text');
        } else {
            setIcon(eyeOff);
            setType('password');
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupinfo;
        if (!name || !email || !password) {
            return handleError('All fields are required');
        }
        try {
            const response = await fetch('https://deploy-auth-mern-api.vercel.app/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(signupinfo),
            });
            const result = await response.json();
            const { success, message, error } = result;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            }
        } catch (error) {
            handleError(error);
        }
    };

    return (
        <div className={styles["signup-container"]}>
            <form onSubmit={handleSignup}>
                <h1>Signup</h1> {/* Make sure this is before the form fields */}
                {/* Name Field */}
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        onChange={handleChange}
                        type="text"
                        id="name"
                        name="name"
                        autoFocus
                        placeholder="Enter Your name..."
                        value={signupinfo.name}
                    />
                </div>

                {/* Email Field */}
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        onChange={handleChange}
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter Your email..."
                        value={signupinfo.email}
                    />
                </div>

                {/* Password Field */}
                <div className={styles["password-container"]}>
                    <label htmlFor="password">Password</label>
                    <div className={styles["password-input-wrapper"]}>
                        <input
                            onChange={handleChange}
                            type={type}
                            name="password"
                            id="password"
                            placeholder="Enter Your password..."
                            value={signupinfo.password}
                        />
                        <span className={styles["icon-wrapper"]} onClick={handleToggle}>
                            <Icon icon={icon} size={25} />
                        </span>
                    </div>
                </div>

                {/* Signup Button */}
                <button type="submit">Signup</button>
                <span style={{ marginLeft: '5px' }}> Already have an account? 
                    <Link to="/login">Login</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Signup;
