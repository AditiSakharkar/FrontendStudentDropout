import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getAllSchemes, getparticular_student_details } from '../../redux/slices/authslice.js';
import { toast } from "react-hot-toast";
import './Dashboard.css';

const StudentDashboard = () => {
  const { student_details, loading, error, isAdmin, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (student_details?._id) {
      dispatch(getAllSchemes());
      dispatch(getparticular_student_details(student_details._id));
    }
  }, [dispatch, student_details?._id, student_details?.applications?.length]);

  const handleBrowseScheme = async () => {
    let schemeResult = await dispatch(getAllSchemes());
    if (schemeResult.type === 'auth/getAll/fulfilled') {
      navigate('/BrowseScheme');
    } else {
      toast.error("An unexpected error occurred.");
    }
  };

  const handleAppliedScheme = async () => {
    await dispatch(getparticular_student_details(student_details._id)).unwrap();
    navigate('/AppliedSchemes');
  };

  const handlePersonalDetails = () => {
    navigate("/ShowDetails");
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
            <span>{student_details?.name || "N/A"}</span>
          </div>
          <p className="emailstudent">
            <strong>Email: </strong>{student_details?.email || "N/A"}
          </p>
          <p><strong>Applied Schemes: </strong>{student_details?.applications?.length || 0}</p>
        </div>
      </div>

      {/* Button Section */}
      <div className="button-section">
        <button className="edit-btn" onClick={handleAppliedScheme}>
          View Applied Schemes
        </button>
        <button className="edit-btn" onClick={handleBrowseScheme}>
          Browse Scheme
        </button>
        <button className="edit-btn" onClick={handlePersonalDetails}>
          Personal Details
        </button>
      </div>
    </div>
  );
};

export default StudentDashboard;
