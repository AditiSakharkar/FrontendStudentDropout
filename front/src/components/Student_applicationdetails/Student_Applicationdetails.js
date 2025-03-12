import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { approveorreject } from '../../redux/slices/authslice';
import toast from 'react-hot-toast';
import './studentapplication.css'
const StudentApplicationDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { student_details, scheme_details } = useSelector((state) => state.auth);

  // Ensure student_details and scheme_details exist before accessing properties
  if (!student_details || !scheme_details) {
    return <p>Loading...</p>;
  }

  const application = student_details.applications?.find(app => app.scheme === scheme_details._id);
  const isPending = application?.status === 'pending';

  const handleDecision = async (status) => {
    try {
      await dispatch(approveorreject({
        userId: student_details._id,
        status,
        schemeId: scheme_details._id
      })).unwrap();

      toast.success(`Application ${status} successfully`);
      navigate(`/SchemeDetails/${scheme_details._id}`);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="container">
      <h1>Student Name: {student_details.name}</h1>
      <h2>Email: {student_details.email}</h2>
      <h2>Application Status: {application?.status || 'N/A'}</h2>

      <h4>Documents</h4>

      {isPending && (
        <div>
          <button className="accept-btn" onClick={() => handleDecision("approved")}>Accept</button>
          <button className="reject-btn" onClick={() => handleDecision("rejected")}>Reject</button>
        </div>
      )}
    </div>
  );
};

export default StudentApplicationDetails;
