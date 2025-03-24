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
    dispatch(getparticular_schemenames(schemeId));
  }, [dispatch, schemeId]);

  const students = scheme_details?.appliedUsers || [];

  const handledetails = async (studentId) => {
    await dispatch(getparticular_student_details(studentId)).unwrap();
    navigate(`/StudentDetails/${studentId}`);
  };

  if (!scheme_details) {
    return <div>Scheme not found.</div>;
  }

  return (
    <div className="scheme-details-container">
      <h1 className="scheme-details-header">{scheme_details.title}</h1>
      <h2 className="scheme-section-title">Details of the Scheme</h2>

      {/* Scheme Information */}
      <div className="scheme-info">
        <p><strong>Scheme ID:</strong> {scheme_details._id}</p>
        <p><strong>Description:</strong> {scheme_details.description}</p>
        <p><strong>Eligibility Criteria:</strong> {scheme_details.eligibilityCriteria}</p>
        <p><strong>Issuing Body:</strong> {scheme_details.issuingBody || 'N/A'}</p>
        <p><strong>Last Date of Submission:</strong> {scheme_details.lastDateOfSubmission 
          ? new Date(scheme_details.lastDateOfSubmission).toLocaleDateString() 
          : 'N/A'}
        </p>
        <p><strong>Scheme Type:</strong> {scheme_details.schemeType || 'N/A'}</p>
        <p><strong>Amount or Support:</strong> {scheme_details.amountOrSupport || 'N/A'}</p>
        <p><strong>Application Process:</strong> {scheme_details.applicationProcess || 'N/A'}</p>
        <p><strong>Selection Process:</strong> {scheme_details.selectionProcess || 'N/A'}</p>
        <p><strong>Duration of Support:</strong> {scheme_details.durationOfSupport || 'N/A'}</p>
        <p><strong>Terms and Conditions:</strong> {scheme_details.termsAndConditions || 'N/A'}</p>
        <p><strong>Contact Information:</strong> {scheme_details.contactInformation || 'N/A'}</p>
        <p><strong>Status:</strong> {scheme_details.status}</p>
        <p><strong>Region Specific:</strong> {scheme_details.regionSpecific || 'N/A'}</p>
      </div>

      {/* Required Documents */}
      <h3 className="scheme-section-title">Required Documents:</h3>
      {scheme_details.documents?.length > 0 ? (
        <ul className="scheme-documents-list">
          {scheme_details.documents.map((doc, index) => (
            <li key={index}>{doc}</li>
          ))}
        </ul>
      ) : (
        <p>No documents specified.</p>
      )}

      {/* Applied Students Section */}
      <h3 className="scheme-section-title">Students Applied:</h3>
      {students.length > 0 ? (
        <table className="scheme-student-table">
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
                    className="scheme-details-btn"
                    onClick={() => handledetails(student.user)}>
                    Student Application Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No students have applied yet.</p>
      )}
    </div>
  );
};

export default SchemeDetails;
