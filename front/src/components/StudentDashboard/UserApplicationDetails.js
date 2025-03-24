import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "./UserApplicationDetails.css";

const UserApplicationDetails = () => {
  const navigate = useNavigate();
  const { schemeid } = useParams();
  const { student_details, scheme_details } = useSelector((state) => state.auth);

  if (!student_details) {
    return <p className="user-application-detail">Loading...</p>;
  }

  const application = student_details.applications?.find(app => app.scheme === schemeid);

  if (!application) {
    return <p className="user-application-detail">Application not found.</p>;
  }

  const scheme = scheme_details?._id === schemeid ? scheme_details : null;
  const documentLinks = application?.documentLinks || {};

  return (
    <div id="user-application-container">
      <h1 id="user-application-title">Application Details</h1>
      
      {/* Student Details */}
      <h2 className="user-application-heading">Name: {student_details.name}</h2>
      <h2 id="user-application-email">
  <span className="user-application-label">Email:</span> {student_details.email}
</h2>

      <h2 className="user-application-heading">Scheme Name: {application.schemename || 'N/A'}</h2>
      
      <p className="user-application-detail"><span className="user-application-label">Scheme ID:</span> {application.scheme}</p>
      <p className="user-application-detail"><span className="user-application-label">Application ID:</span> {application._id}</p>
      <p className="user-application-detail"><span className="user-application-label">Status:</span> {application.status}</p>
      <p className="user-application-detail"><span className="user-application-label">Applied At:</span> {new Date(application.appliedAt).toLocaleString()}</p>

      {/* Scheme Details */}
      {scheme ? (
        <div id="user-application-scheme-section">
          <h2 className="user-application-heading">Scheme Details</h2>
          <p className="user-application-detail"><span className="user-application-label">Description:</span> {scheme.description || 'N/A'}</p>
          <p className="user-application-detail"><span className="user-application-label">Eligibility Criteria:</span> {scheme.eligibilityCriteria || 'N/A'}</p>
          <p className="user-application-detail"><span className="user-application-label">Issuing Body:</span> {scheme.issuingBody || 'N/A'}</p>
          <p className="user-application-detail"><span className="user-application-label">Last Date of Submission:</span> {scheme.lastDateOfSubmission 
            ? new Date(scheme.lastDateOfSubmission).toLocaleDateString() 
            : 'N/A'}</p>
          <p className="user-application-detail"><span className="user-application-label">Scheme Type:</span> {scheme.schemeType || 'N/A'}</p>
          <p className="user-application-detail"><span className="user-application-label">Amount or Support Provided:</span> {scheme.amountOrSupport || 'N/A'}</p>
          <p className="user-application-detail"><span className="user-application-label">Contact Information:</span> {scheme.contactInformation || 'N/A'}</p>
          <p className="user-application-detail"><span className="user-application-label">Selection Process:</span> {scheme.selectionProcess || 'N/A'}</p>
          <p className="user-application-detail"><span className="user-application-label">Status:</span> {scheme.status || 'N/A'}</p>
        </div>
      ) : (
        <p className="user-application-detail">Scheme details not available.</p>
      )}

      {/* Documents Uploaded */}
      <h4 id="user-application-documents">Documents Uploaded</h4>
      {Object.keys(documentLinks).length > 0 ? (
        <ul>
          {Object.entries(documentLinks).map(([docName, link], index) => (
            <li key={index}>
              {docName}:&nbsp;
              <a 
                href={link.startsWith('http') ? link : `https://${link}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="user-application-doc-link"
              >
                View Document
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="user-application-detail">No documents submitted.</p>
      )}

      {/* Back to Dashboard Button */}
      <button 
        id="user-application-back-btn" 
        onClick={() => navigate('/student/dashboard')}
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default UserApplicationDetails;
