import React, { useState } from 'react';

function SchemeEditor({ onSubmit }) {
  const [name, setName] = useState('');
  const [eligibility, setEligibility] = useState('');
  const [details, setDetails] = useState('');

  const handleSubmit = () => {
    onSubmit({ name, eligibility, details });
  };

  return (
    <div className="scheme-editor">
      <h3>Add New Scheme</h3>
      <input
        type="text"
        placeholder="Scheme Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Eligibility"
        value={eligibility}
        onChange={(e) => setEligibility(e.target.value)}
      />
      <textarea
        placeholder="Scheme Details"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
      />
      <button onClick={handleSubmit}>Add New Scheme</button>
    </div>
  );
}

export default SchemeEditor;