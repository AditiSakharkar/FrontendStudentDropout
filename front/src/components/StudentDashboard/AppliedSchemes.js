import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AppliedSchemes.css";
import { useDispatch, useSelector } from "react-redux";
import { getparticular_schemenames } from '../../redux/slices/authslice';

const AppliedSchemes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const { student_details } = useSelector((state) => state.auth);
  const schemes = student_details?.applications || [];

  const filteredSchemes = schemes.filter((scheme) =>
    scheme.scheme.toString().includes(searchTerm) || 
    scheme._id.toString().includes(searchTerm)
  );

  const handledetails = async (schemeId) => {
    await dispatch(getparticular_schemenames(schemeId)).unwrap();
    navigate(`/userapplicationschemedetails/${schemeId}`);
  };

  return (
    <div className="applied-schemes-container">
      <h2>Applied Schemes</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search schemes by ID..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      {/* Scheme Table */}
      {filteredSchemes.length > 0 ? (
        <table className="scheme-table">
          <thead>
            <tr>
              <th>Scheme ID</th>
              <th>Scheme Name</th>
              <th>Application ID</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredSchemes.reverse().map((scheme) => (
              <tr key={scheme._id}>
                <td>{scheme.scheme}</td>
                <td>{scheme.schemename}</td>
                <td>{scheme._id}</td>
                <td>
                  <span className={`status ${scheme.status.toLowerCase()}`}>
                    {scheme.status.toUpperCase()}
                  </span>
                </td>
                <td>
                  <button
                    className="scheme-btn"
                    onClick={() => handledetails(scheme.scheme)}
                  >
                    Show Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No schemes found</p>
      )}
    </div>
  );
};

export default AppliedSchemes;
