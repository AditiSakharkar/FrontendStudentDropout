//import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import { useDispatch, useSelector } from "react-redux";
import { getAllSchemes } from "../../redux/slices/authslice.js";
import { toast } from "react-hot-toast";
import { getparticular_student_details} from '../../redux/slices/authslice.js';

const StudentDashboard = () => {
  const { user, loading, error ,isAdmin,token} = useSelector((state) => state.auth);
  console.log(user);
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

  const handleAppliedScheme = async() => {
    await dispatch(getparticular_student_details(user._id)).unwrap();
    navigate('/AppliedSchemes');
  };

  const handlepersonaldetails=()=>{
    navigate("/Fulldetails");
  }

  return (
    <div className="dashboard-container">


      {/* Profile Section */}
      <div className="profile-section">
        <div className="profile-photo">
          <img src="/user2.png" alt="Profile" />
        </div>

        <div className="profile-details">
          <div className="student-name">
         
              <span>{user.name}</span>
          </div>
          <p className="emailstudent">
            <strong >Email: </strong>{' '}
            
              {user.email}
          </p>
          <p><strong>Applied Schemes: </strong>{user.applications.length}</p>

          {/* <p><strong>Applied Schemes: </strong>3</p>
        <button className="edit-btn">View Applied Schemes</button> */}


        
      {/* Button Section */}
      <div className="button-section">
      <button className="edit-btn" onClick={handleAppliedScheme}>
          View Applied Schemes
        </button>
        <button className="edit-btn" onClick={handleBrowseScheme}>
          Browse Scheme
        </button>
        <button className="edit-btn" onClick={handlepersonaldetails}>
          Personal Details
        </button>
       
      </div>
         
        </div>
      </div>

     



    </div>
  );
};

export default StudentDashboard;
