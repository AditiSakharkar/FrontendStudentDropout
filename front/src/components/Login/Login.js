// src/components/Login/Login.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { studentLogin ,adminLogin} from '../../redux/slices/authslice';
import { toast } from 'react-hot-toast';
import './Login.css';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user, loading, error ,isAdmin} = useSelector((state) => state.auth);
  const { role } = location.state || { role: 'student' };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let loginResult;

     if (role === 'student') {
        loginResult = await dispatch(studentLogin({ email, password }));
      } else if (role === 'admin') {
        loginResult = await dispatch(adminLogin({ email, password })); 
      }

      if (loginResult.type === 'auth/studentLogin/fulfilled' || loginResult.type === 'auth/adminLogin/fulfilled') {
        toast.success('Login successful!');
        
        const loggedInUser = loginResult.payload?.user; // ✅ Get user from login response
        console.log(loggedInUser); 
      
        navigate(loggedInUser?.role === 'admin' ? '/admin/dashboard' : '/student/dashboard');
      } else {
        toast.error(loginResult.payload || "Login failed!");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
      console.error(error);
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

