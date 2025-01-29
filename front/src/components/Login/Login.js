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
        // Optionally, navigate to the dashboard based on the role
        console.log(user);
         navigate(isAdmin ? '/admin/dashboard' : '/student/dashboard');
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




// // src/components/Login/Login.js
// // import React from 'react';
// import './Login.css';
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';


// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   // const handleLogin = () => {
//   //   // Here you can add login authentication logic (e.g., API call).
//   //   // For now, we’ll assume login is successful and navigate to the dashboard.
//   //   navigate('/dashboard');
//   // };

//   const handleLogin = () => {
//     navigate('/student/dashboard');
//     // Simulate role-checking logic (you may replace this with an API call)
//     // const userRole = email === 'admin@example.com' ? 'admin' : 'student';
    
//     // // Store the user role in localStorage (optional)
//     // localStorage.setItem('userRole', userRole);

//     // // Navigate based on role
//     // if (userRole === 'admin') {
//     //   navigate('/admin/dashboard');
//     // } else {
//     //   navigate('/student/dashboard');
//     // }
//   };
//   return (
//     <div className="login">
//       <h3>LOGIN PAGE</h3>
//       <input type="email" placeholder="Email address" value={email}
//         onChange={(e) => setEmail(e.target.value)} />
//       <input type="password" placeholder="Password" value={password}
//         onChange={(e) => setPassword(e.target.value)}/>
//       <a href="/" className="forgot-password">forgot password?</a>
//       <button onClick={handleLogin} className="login-btn">Login</button>
     
//     </div>
    
//   );
// }

// export default Login;
