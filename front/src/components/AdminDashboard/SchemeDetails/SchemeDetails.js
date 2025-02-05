import React from 'react';
import './SchemeDetails.css';

const SchemeDetails = () => {
  const students = [
    'Student 1',
    'Student 2',
    'Student 3',
    'Student 4',
    'Student 5',
  ];

  const handleAccept = (student) => {
    console.log(`${student} Accepted`);
  };

  const handleReject = (student) => {
    console.log(`${student} Rejected`);
  };

  return (
    <div className="container">
      <h1>Scheme name</h1>
      <div className="student-list">
        {students.map((student, index) => (
          <div className="student-item" key={index}>
            <span>{student}</span>
            <div className="buttons">
              <button
                className="accept-btn"
                onClick={() => handleAccept(student)}
              >
                Accept
              </button>
              <button
                className="reject-btn"
                onClick={() => handleReject(student)}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SchemeDetails;
