import React, { useState } from "react";
import "./CreateSchemeForm.css";

const CreateSchemeForm = () => {
  const [schemeData, setSchemeData] = useState({
    schemeName: "",
    description: "",
    eligibility: "",
    startDate: "",
    endDate: "",
    
    additionalInfo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSchemeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Scheme Created:", schemeData);
    alert("Scheme created successfully!");
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Create New Scheme</h2>
      <form className="scheme-form" onSubmit={handleSubmit}>
        <label htmlFor="schemeName">Scheme Name:</label>
        <input
          type="text"
          id="schemeName"
          name="schemeName"
          value={schemeData.schemeName}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={schemeData.description}
          onChange={handleChange}
          required
        ></textarea>

        <label htmlFor="eligibility">Eligibility Criteria:</label>
        <textarea
          id="eligibility"
          name="eligibility"
          value={schemeData.eligibility}
          onChange={handleChange}
          required
        ></textarea>

        <label htmlFor="startDate">Start Date:</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={schemeData.startDate}
          onChange={handleChange}
          required
        />

        <label htmlFor="endDate">End Date:</label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={schemeData.endDate}
          onChange={handleChange}
          required
        />

        

        <label htmlFor="additionalInfo">Additional Information:</label>
        <textarea
          id="additionalInfo"
          name="additionalInfo"
          value={schemeData.additionalInfo}
          onChange={handleChange}
        ></textarea>

        <button type="submit" className="submit-button">Create Scheme</button>
      </form>
    </div>
  );
};

export default CreateSchemeForm;
