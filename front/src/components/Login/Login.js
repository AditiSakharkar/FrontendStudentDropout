// src/components/Login/Login.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Login.css';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { role } = location.state || { role: 'student' }; // Default to student if no role is passed

  const handleLogin = () => {
    // Simulate role-based navigation
    if (role === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/student/dashboard');
    }
  };

  return (
    <div className="login">
      <h3>{role === 'admin' ? 'Admin Login' : 'Student Login'}</h3>
      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <a href="/" className="forgot-password">Forgot password?</a>
      <button onClick={handleLogin} className="login-btn">Login</button>
    </div>
  );
}

export default Login;

