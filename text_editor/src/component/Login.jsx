import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/login.css';
import { FaEye } from "react-icons/fa";
import axios from 'axios';
import CryptoJS from 'crypto-js';
import gif from './styles/icons8-pencil.gif';
import note from './styles/note_50.png';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.get(`http://localhost:5000/users?name=${username}`);
            console.log('API Response:', response.data); // Debugging

            // Ensure response is always an array
            const users = Array.isArray(response.data) ? response.data : [response.data];

            if (users.length === 0) {
                alert('Invalid username');
                return;
            }

            const user = users[0];

            if (!user.password) {
                alert("Password not found for this user. Please contact support.");
                return;
            }

            const [saltString, hashedPassword] = user.password.split(':');
            if (!saltString || !hashedPassword) {
                alert("Invalid password format.");
                return;
            }

            const salt = CryptoJS.enc.Hex.parse(saltString);
            const inputHashedPassword = CryptoJS.PBKDF2(password, salt, {
                keySize: 256 / 32,
                iterations: 1000,
                hasher: CryptoJS.algo.SHA256
            }).toString();

            if (user.access === 0) {
                alert('You are blocked by admin');
                return;
            }

            if ((user.name === username || user.email === username) && inputHashedPassword === hashedPassword) {
                if (user.name === 'magesh' || user.email === 'themagesh.v@gmail.com') {
                    localStorage.setItem('admin', 'True');
                }
                localStorage.setItem('username', user.name);
                navigate('/dash');
            } else {
                alert('Invalid password');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('Login failed. Please try again.');
        }
    };

    return (
        <div className='container'>
            <img src={gif} alt="" className='pencil' />
            <img src={note} alt="" className='note' />
            <div className='body'>
                <form className='form' onSubmit={handleSubmit}>
                    <h1 className='login'>Login</h1>
                    <div className="form-group">
                        <input
                            className='input'
                            type="text"
                            value={username}
                            placeholder='Username'
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            spellCheck='false'
                            id="username" // Unique ID
                        />
                    </div>
                    <div className="form-group">
                        <input
                            className='input'
                            type={showPassword ? "text" : "password"}
                            id="password" // Unique ID
                            value={password}
                            placeholder='Password'
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            spellCheck='false'
                        />
                        <FaEye className='eye' onClick={() => setShowPassword(!showPassword)} />
                    </div>
                    <button className='button' type="submit">Login</button>
                    <div className='register'>
                        <p>I don't have an account?</p>
                        <span onClick={() => navigate('/register')}>Register Here</span>
                    </div>
                </form>
            </div>
            <div className='side'>
                <h1>Online Text Editor</h1>
                <h2>Connect Together, Create Together.</h2>
            </div>
        </div>
    );
}

export default Login;
