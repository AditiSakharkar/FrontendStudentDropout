import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AppliedSchemes.css";
import {toast} from "react-hot-toast"
import { useSelector } from "react-redux";

const AppliedSchemes = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const {user}=useSelector((state)=>state.auth)
  const schemes=user.applications;

 

  

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
        {schemes.length > 0 ? (
          schemes.map((scheme) => (
            <div key={scheme.id} className="scheme-card">
              <h3>Scheme id:{scheme.scheme}</h3>
              <h3>Application Id: {scheme._id}</h3>
              <p>Application Status: <span className={`status ${scheme.status.toLowerCase()}`}>{scheme.status}</span></p>
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
