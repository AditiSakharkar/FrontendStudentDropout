//import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import { useDispatch, useSelector } from "react-redux";
import { getAllSchemes } from "../../redux/slices/authslice.js";
import { toast } from "react-hot-toast";


const StudentDashboard = () => {
  const { user, loading, error ,isAdmin,token} = useSelector((state) => state.auth);
  const dispatch=useDispatch();
  const navigate = useNavigate();
 
  const handleBrowseScheme =async () => {
   
    let schemeresult = await dispatch(getAllSchemes());
    if(schemeresult.type === 'auth/getAll/fulfilled'){

      navigate('/BrowseScheme');
    }
    else{
       toast.error("An unexpected error occurred.");  
    }
  };

  const handleAppliedScheme = () => {
    navigate('/AppliedSchemes');
  };

  const handleApplyScheme = () => {
    navigate('/Fulldetails');
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
         
              <span>{user.email}</span>
          </div>
          <p>
            <strong>Email: </strong>{' '}
            
              {user.email}
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
        <button className="edit-btn" onClick={handleApplyScheme}>
          Apply Scheme
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
