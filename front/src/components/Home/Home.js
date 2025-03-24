import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      {/* Left Section - Introduction */}
      <div className="home-intro">
        <h2>Welcome to <span className="highlight">SHIKSHA SETU</span></h2>
        <p>
          Shiksha Setu is a platform designed to support students who have faced challenges in continuing their education.  
          Our mission is to connect students with educational schemes and financial support.  
          Empowering students to achieve their dreams through accessible opportunities is our primary goal.
        </p>
      </div>

      {/* Right Section - Action Buttons */}
      <div className="home-options">
        <h3>Get Started</h3>
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
    </div>
  );
}

export default Home;
