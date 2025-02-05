import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AppliedSchemes.css";

const AppliedSchemes = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const schemes = [
    { id: 1, name: "Scheme 1", status: "Accepted" },
    { id: 2, name: "Scheme 2", status: "In Progress" },
    { id: 3, name: "Scheme 3", status: "Rejected" },
  ];

  const filteredSchemes = schemes.filter((scheme) =>
    scheme.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="applied-schemes-container">
      <h2>Applied Schemes</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search schemes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      {/* Scheme List */}
      <div className="scheme-list">
        {filteredSchemes.length > 0 ? (
          filteredSchemes.map((scheme) => (
            <div key={scheme.id} className="scheme-card">
              <h3>{scheme.name}</h3>
              <p>Status: <span className={`status ${scheme.status.toLowerCase()}`}>{scheme.status}</span></p>
              <button onClick={() => navigate(`/scheme-details/${scheme.id}`)}>Show Details</button>
            </div>
          ))
        ) : (
          <p>No schemes found</p>
        )}
      </div>
    </div>
  );
};

export default AppliedSchemes;
