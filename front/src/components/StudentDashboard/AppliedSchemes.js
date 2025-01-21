import React from 'react';

function AppliedSchemes({ schemes }) {
  return (
    <div className="applied-schemes">
      <h3>Applied Schemes</h3>
      <ul>
        {schemes.map((scheme) => (
          <li key={scheme.id} className="scheme-item">
            <span>{scheme.name}</span>
            <span className={`status ${scheme.status.toLowerCase()}`}>{scheme.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AppliedSchemes;