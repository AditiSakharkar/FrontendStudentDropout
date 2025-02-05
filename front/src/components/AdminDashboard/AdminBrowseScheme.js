import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminBrowse.css';

const AdminBrowseScheme = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  const schemes = Array.from({ length: 5 }, (_, i) => `Scheme ${i + 1}`);

  const handleApply = () => {
    navigate('/SchemeDetails');
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
        {schemes.filter(scheme => scheme.toLowerCase().includes(searchTerm.toLowerCase())).map((scheme, index) => (
          <div key={index} className="scheme-item">
            <span>{scheme}</span>
            <button className="apply-btn" onClick={handleApply}>Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBrowseScheme;
