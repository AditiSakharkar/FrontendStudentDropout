import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Browse.css';
import { useDispatch, useSelector } from "react-redux";
import { getAllSchemes } from "../../redux/slices/schemeslice.js";
import { toast } from "react-hot-toast";
const BrowseScheme = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  const ss = Array.from({ length: 10 }, (_, i) => `Scheme ${i + 1}`);
  const {schemes}=useSelector((state)=>state.auth);
  console.log(schemes)

  const handleApply = () => {
    navigate('/StudentForm');
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
      <div className="scheme-list">
      {schemes?.length > 0 ? (
          schemes
            .filter(scheme => scheme.title.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((scheme) => (
              <div key={scheme._id} className="scheme-item">
                <h3>{scheme.title}</h3>
                <p>{scheme.description}</p>
                <p><strong>Status:</strong> {scheme.status}</p>
                <button className="apply-btn" onClick={() => handleApply(scheme._id)}>
                  Apply
                </button>
              </div>
            ))
        ) : (
          <p>No schemes available.</p> // Display when no schemes are found
        )}
      </div>
    </div>
  );
};

export default BrowseScheme;
