//import React, { useState } from 'react';
import './Dashboard.css';

const Fulldetails = () => {
 
  return (
    <div className="dashboard-container">

      {/* Personal Details Section */}
      <div className="details-section">
        <h3>Personal Details</h3>
        <p><strong>Name: </strong>John Doe</p>
        <p><strong>Droupout year: </strong>2024</p>
        <p><strong>Date of Birth: </strong>01/01/2000</p>
        
        <button className="edit-btn">APPLY</button>
      </div>


    </div>
  );
};

export default Fulldetails;
