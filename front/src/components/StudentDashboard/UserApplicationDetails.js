import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "./UserApplicationDetails.css";

const UserApplicationDetails = () => {
  const navigate = useNavigate();
  const { schemeid } = useParams();
  const { student_details, scheme_details } = useSelector((state) => state.auth);

  // Ensure data exists
  if (!student_details) {
  
 
    return <p>Loading...</p>;
  }

  // Find application using scheme ID
  const application = student_details.applications?.find(app => app.scheme === schemeid);
  
  if (!application) {
    return <p>Application not found.</p>;
  }

  const documentLinks = application?.documentLinks || {};
  const isPending = application?.status === 'pending';

  return (
    <div className="container">
      <h1>Application Details</h1>
      <h2>Name: {student_details.name}</h2>
      <h2 className="emailstudent">Email: {student_details.email}</h2>
      <h2>Scheme Name: {application.schemename || 'N/A'}</h2>
      <p><strong>Scheme ID:</strong> {application.scheme}</p>
      <p><strong>Application ID:</strong> {application._id}</p>
      <p><strong>Status:</strong> {application.status}</p>
      <p><strong>Applied At:</strong> {new Date(application.appliedAt).toLocaleString()}</p>

      <h4>Documents Uploaded</h4>
      {Object.keys(documentLinks).length > 0 ? (
        <ul>
          {Object.entries(documentLinks).map(([docName, link], index) => (
            <li key={index}>
              {docName}:&nbsp;
              <a href={link.startsWith('http') ? link : `https://${link}`} target="_blank" rel="noopener noreferrer" className="document-link">
                View Document
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No documents submitted.</p>
      )}

      <button className="back-btn" onClick={() => navigate('/student/dashboard')}>Back to Dashboard</button>
    </div>
  );
};

export default UserApplicationDetails;
