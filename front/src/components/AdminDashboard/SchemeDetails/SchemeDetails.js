import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './SchemeDetails.css';
import { getparticular_student_details, getparticular_schemenames } from '../../../redux/slices/authslice';

const SchemeDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { schemeId } = useParams();
  const { scheme_details } = useSelector((state) => state.auth);

  useEffect(() => {
    // 🔹 Re-fetch scheme details to update the status
    dispatch(getparticular_schemenames(schemeId));
  }, [dispatch, schemeId]); // Runs when schemeId changes

  const students = scheme_details ? scheme_details.appliedUsers : [];

  const handledetails = async (studentId) => {
    await dispatch(getparticular_student_details(studentId)).unwrap();
    navigate(`/StudentDetails/${studentId}`);
  };

  if (!scheme_details) {
    return <div>Scheme not found.</div>;
  }

  return (
    <div className="container">
      <h1>{scheme_details.title}</h1>
      <h2>Details of the Scheme</h2>
      <div className="scheme-info">
        <p><strong>Scheme ID:</strong> {scheme_details._id}</p>
        <p><strong>Description:</strong> {scheme_details.description}</p>
      </div>

      <h3>Students Applied:</h3>
      <table className="student-table">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Applied At</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.user}</td>
              <td>{new Date(student.appliedAt).toLocaleDateString()}</td>
              <td>{student.status}</td>
              <td>
                <button 
                  className="details-btn"
                  onClick={() => handledetails(student.user)}>
                  Student application Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SchemeDetails;
