import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Browse.css';
import { useSelector } from "react-redux";

const BrowseScheme = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const { schemes, student_details } = useSelector((state) => state.auth);
  const applications = student_details?.applications || [];

  const filteredSchemes = schemes?.filter(scheme =>
    !applications.some(app => app.scheme === scheme._id)
  );

  const handleApply = (schemeId) => {
    navigate(`/StudentForm/${schemeId}`);
  };

  return (
    <div className="browse-container">
      <h2>Browse Schemes</h2>
      <input
        type="text"
        placeholder="Search schemes..."
        className="search-bar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredSchemes?.length > 0 ? (
        <table className="scheme-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredSchemes
              .filter(scheme => scheme.title.toLowerCase().includes(searchTerm.toLowerCase()))
              .reverse().map((scheme) => (
                <tr key={scheme._id}>
                  <td>{scheme.title}</td>
                  <td>{scheme.description}</td>
                  <td>{scheme.status}</td>
                  <td>
                    <button className="apply-btn" onClick={() => handleApply(scheme._id)}>
                      Apply
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <p>No schemes available.</p>
      )}
    </div>
  );
};

export default BrowseScheme;
