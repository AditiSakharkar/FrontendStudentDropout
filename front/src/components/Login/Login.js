// src/components/Login/Login.js
// import React from 'react';
import './Login.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // const handleLogin = () => {
  //   // Here you can add login authentication logic (e.g., API call).
  //   // For now, we’ll assume login is successful and navigate to the dashboard.
  //   navigate('/dashboard');
  // };

  const handleLogin = () => {
    navigate('/student/dashboard');
    // Simulate role-checking logic (you may replace this with an API call)
    // const userRole = email === 'admin@example.com' ? 'admin' : 'student';
    
    // // Store the user role in localStorage (optional)
    // localStorage.setItem('userRole', userRole);

    // // Navigate based on role
    // if (userRole === 'admin') {
    //   navigate('/admin/dashboard');
    // } else {
    //   navigate('/student/dashboard');
    // }
  };
  return (
    <div className="login">
      <h3>LOGIN PAGE</h3>
      <input type="email" placeholder="Email address" value={email}
        onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password}
        onChange={(e) => setPassword(e.target.value)}/>
      <a href="/" className="forgot-password">forgot password?</a>
      <button onClick={handleLogin} className="login-btn">Login</button>
     
    </div>
    
  );
}

export default Login;
