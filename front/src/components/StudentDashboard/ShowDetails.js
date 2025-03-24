import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './ShowDetails.css';

const ShowDetails = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Display "NA" for missing data
  const getDisplayValue = (value) => (value ? value : 'NA');

  const renderField = (label, value) => (
    <div className="showdetails-field">
      <label>{label}:</label>
      {label === 'Resume Link' && value ? (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="showdetails-link"
        >
          View Resume
        </a>
      ) : (
        <span>{getDisplayValue(value)}</span>
      )}
    </div>
  );

  return (
    <div className="showdetails-container">
      <h2 className="showdetails-title">Your Profile Details</h2>

      {/* Personal Details */}
      <h3 className="showdetails-section">Personal Details</h3>
      {renderField('Name', user?.name)}
      {renderField('DOB', user?.dob ? new Date(user.dob).toLocaleDateString('en-GB') : 'NA')}
      {renderField('Phone', user?.phone)}
      {renderField('Address', user?.address)}
      {renderField('State', user?.state)}
      {renderField('District', user?.district)}
      {renderField('Resume Link', user?.resumeLink)}

      {/* Education Details */}
      <h3 className="showdetails-section">Education</h3>
      {user?.education?.length > 0 ? (
        user.education.map((edu, index) => (
          <div key={index} className="showdetails-education">
            {renderField('Course', edu.course)}
            {renderField('Marks', edu.marks)}
            {renderField('Year Completed', edu.yearCompleted)}
            {renderField('Field', edu.field)}
          </div>
        ))
      ) : (
        <p className="showdetails-no-data">No education details available.</p>
      )}

      {/* Dropout Details */}
      <h3 className="showdetails-section">Dropout Details</h3>
      {renderField('Dropout Course', user?.dropoutDetails?.dropoutCourse)}
      {renderField('Dropout Year', user?.dropoutDetails?.dropoutYear)}
      {renderField('Dropout Institute', user?.dropoutDetails?.dropoutInstitute)}
      {renderField('Dropout Reason', user?.dropoutDetails?.dropoutReason)}

      {/* Navigate to Edit Page */}
      <button className="showdetails-button" onClick={() => navigate('/fulldetails')}>
        Edit Details
      </button> 
    </div>
  );
};

export default ShowDetails;
