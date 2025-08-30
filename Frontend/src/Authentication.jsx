import React, { useState } from 'react';
import axios from 'axios';
import './auth.css';
import { useNavigate } from 'react-router-dom';

export const Authentication = ({ setisAllowed }) => {
    const [isStudent, setisStudent] = useState(false);
    const [isTeacher, setisTeacher] = useState(true);
    const [User, setUser] = useState('');
    const [Password, setPassword] = useState('');
    const navigate = useNavigate();

    const Signin = () => {
        axios.post('http://localhost:5000/signin', {
            username: User,
            password: Password,
            Teacher: isTeacher,
            Student: isStudent
        }).then(res => {
            if (res.data.status === "success") {
                setisAllowed(true);
                localStorage.setItem("token-AttTracker", res.data.token);
                navigate('/Attendancepage')
            }
        })
        .catch(err => console.log(err));
    }

    return (
        <div id='container'>
            <div id='userinfo'>
                <button id='teacher' onClick={() => { setisTeacher(true); setisStudent(false); }}>Teacher</button>
                <button id='student' onClick={() => { setisStudent(true); setisTeacher(false); }}>Student</button>
            </div>
            <form id="signinform" onSubmit={(e) => { e.preventDefault(); Signin(); }}>
                <h2 id="formHeading">Signin</h2>
                <div className="info">
                    <label>Username:</label>
                    <input type="text" id="username" value={User} onChange={(e) => setUser(e.target.value)} />
                </div>
                <div className="info">
                    <label>Password:</label>
                    <input type="password" id="userpassword" value={Password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" id="submitbtn">Signin</button>
            </form>
        </div>
    );
};
