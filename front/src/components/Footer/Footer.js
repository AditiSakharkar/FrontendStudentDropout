// src/components/Footer/Footer.js
import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="social-handles">
        <span>Follow us: </span>
        <a href="/">Instagram</a> | <a href="/">Facebook</a> | <a href="/">LinkedIn</a>
      </div>
    </footer>
  );
}

export default Footer;
