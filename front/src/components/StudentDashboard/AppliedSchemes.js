import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AppliedSchemes.css";
import { useSelector } from "react-redux";

const AppliedSchemes = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useSelector((state) => state.auth);
  const schemes = user.applications;
  console.log(schemes);

  const filteredSchemes = schemes.filter((scheme) =>
    scheme.scheme.toString().includes(searchTerm) || 
    scheme._id.toString().includes(searchTerm)
  );

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
            {filteredSchemes.map((scheme) => (
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
                    onClick={() => navigate(`/userapplicationschemedetails/${scheme.scheme}`)}
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
