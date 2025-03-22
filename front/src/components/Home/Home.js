// src/components/Home/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <h2>SHIKSHA SETU - Dropout Students Support Portal</h2>

      <Link to="/Login" state={{ role: 'admin' }}>
        <button className="home-btn">Admin Login</button>
      </Link>

      <Link to="/Login" state={{ role: 'student' }}>
        <button className="home-btn">Student Login</button>
      </Link>

      <Link to="/Register">
        <button className="home-btn">Create Account</button>
      </Link>
    </div>
  );
}

export default Home;

