// src/components/Navbar/Navbar.js
import React from "react";
import "./Navbar.css";
import "./scrolling.css"
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <nav className="navbar">
        <h1>SHIKSHA SETU - Student Portal</h1>
        <div className="nav-buttons">
          <Link to="/Contact">
            <button>Contact</button>
          </Link>
          <Link to="/">
            <button>Home</button>
          </Link>
          <Link to="/Register">
            <button>Register</button>
          </Link>
        </div>
      </nav>

      <div className="scrolling-text">
        <p>Shiksha-Setu aims to reduce dropout rates by providing a centralized platform for support and new schemes, helping students overcome challenges and creating a more inclusive educational environment.</p>
      </div>
    </div>
  );
}

export default Navbar;
