// src/components/Contact/Contact.js
import React from 'react';
import './Contact.css';

function Contact() {
  return (
    <div className="contact">
      <h3>CONTACT US</h3>
      <input type="text" placeholder="Name" />
      <input type="email" placeholder="Email" />
      <textarea placeholder="Message"></textarea>
      <button className="submit-btn">Submit</button>
    </div>
  );
}

export default Contact;
