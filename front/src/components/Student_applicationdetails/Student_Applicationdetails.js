import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { approveorreject } from '../../redux/slices/authslice';
import toast from 'react-hot-toast';
import './studentapplication.css';

const StudentApplicationDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { student_details, scheme_details } = useSelector((state) => state.auth);

  if (!student_details || !scheme_details) {
    return <p id="loading-text">Loading...</p>;
  }

  const application = student_details.applications?.find(app => app.scheme === scheme_details._id);
  const isPending = application?.status === 'pending';
  const documentLinks = application?.documentLinks || {};

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
    <div id="student-application-container" className="container">
      <h1 className="application-title">Student Application Details</h1>
      
      {/* Personal Details */}
      <section className="section-container" id="personal-details">
        <h4>Personal Details</h4>
        <p><strong>Name:</strong> {student_details.name || 'N/A'}</p>
        <p><strong>Email:</strong> {student_details.email || 'N/A'}</p>
        <p><strong>DOB:</strong> {student_details.dob ? new Date(student_details.dob).toLocaleDateString() : 'N/A'}</p>
        <p><strong>Phone:</strong> {student_details.phone || 'N/A'}</p>
        <p><strong>Address:</strong> {student_details.address || 'N/A'}</p>
        <p><strong>State:</strong> {student_details.state || 'N/A'}</p>
        <p><strong>District:</strong> {student_details.district || 'N/A'}</p>
        <p><strong>Resume Link:</strong> 
          {student_details.resumeLink ? 
            <a href={student_details.resumeLink} target="_blank" rel="noopener noreferrer" className="resume-link"> View Resume</a> 
            : 'N/A'}
        </p>
      </section>

      {/* Education Details */}
      <section className="section-container" id="education-details">
        <h4>Education Details</h4>
        {student_details.education?.length > 0 ? (
          student_details.education.map((edu, index) => (
            <div key={index} className="education-card">
              <p><strong>Course:</strong> {edu.course}</p>
              <p><strong>Marks:</strong> {edu.marks}</p>
              <p><strong>Year Completed:</strong> {edu.yearCompleted}</p>
              <p><strong>Field:</strong> {edu.field}</p>
            </div>
          ))
        ) : (
          <p>No education details available.</p>
        )}
      </section>

      {/* Dropout Details */}
      <section className="section-container" id="dropout-details">
        <h4>Dropout Details</h4>
        <p><strong>Course:</strong> {student_details.dropoutDetails?.dropoutCourse || 'N/A'}</p>
        <p><strong>Year:</strong> {student_details.dropoutDetails?.dropoutYear || 'N/A'}</p>
        <p><strong>Institute:</strong> {student_details.dropoutDetails?.dropoutInstitute || 'N/A'}</p>
        <p><strong>Reason:</strong> {student_details.dropoutDetails?.dropoutReason || 'N/A'}</p>
      </section>

      {/* Application Status */}
      <section className="section-container" id="application-status">
        <h4>Application Status</h4>
        <p><strong>Status:</strong> {application?.status || 'N/A'}</p>
      </section>

      {/* Document Links */}
      <section className="section-container" id="document-section">
        <h4>Documents</h4>
        {Object.keys(documentLinks).length > 0 ? (
          <ul>
            {Object.entries(documentLinks).map(([docName, link], index) => (
              <li key={index}>
                {docName}:&nbsp;
                <a href={link} target="_blank" rel="noopener noreferrer" className="document-link">
                  View Document
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No documents submitted.</p>
        )}
      </section>

      {/* Approve or Reject */}
      {isPending && (
        <div className="action-buttons">
          <button className="accept-btn" onClick={() => handleDecision("approved")}>Accept</button>
          <button className="reject-btn" onClick={() => handleDecision("rejected")}>Reject</button>
        </div>
      )}
    </div>
  );
};

export default StudentApplicationDetails;
