//import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const StudentDashboard = () => {
  const navigate = useNavigate();

  const handleBrowseScheme = () => {
    navigate('/BrowseScheme');
  };

  const handleAppliedScheme = () => {
    navigate('/AppliedScheme');
  };

  return (
    <div className="dashboard-container">


      {/* Profile Section */}
      <div className="profile-section">
        <div className="profile-photo">
          <img src="/user2.png" alt="Profile" />
        </div>

        <div className="profile-details">
          <div className="student-name">
         
              <span>John Doe</span>
          </div>
          <p>
            <strong>Email: </strong>{' '}
            
              'johndoe@gmail.com'
          </p>
          <p><strong>Applied Schemes: </strong>3</p>

          {/* <p><strong>Applied Schemes: </strong>3</p>
        <button className="edit-btn">View Applied Schemes</button> */}


        
      {/* Button Section */}
      <div className="button-section">
      <button className="edit-btn" onClick={handleAppliedScheme}>
          View Applied Scheme
        </button>
        <button className="edit-btn" onClick={handleBrowseScheme}>
          Browse Scheme
        </button>
       
      </div>
         
        </div>
      </div>

      
      {/* Personal Details Section */}
      <div className="details-section">
        <h3>Personal Details</h3>
        <p><strong>Name: </strong>John Doe</p>
        <p><strong>Droupout year: </strong>2024</p>
        <p><strong>Date of Birth: </strong>01/01/2000</p>
        
        <button className="edit-btn">Edit Details</button>
      </div>


      {/* Document Section */}
      <div className="document-section">
        <h3>Documents</h3>
        <input type="file" />
        {/* <button className="edit-btn">Upload Document</button> */}
        <button className="edit-btn">verify Documents</button>
      </div>

      {/* Status Section
      <div className="status-section">
        <h3>Status</h3>
        <p><strong>Applied Schemes: </strong>3</p>
        <button className="edit-btn">View Applied Schemes</button>
      </div> */}

    </div>
  );
};

export default StudentDashboard;
