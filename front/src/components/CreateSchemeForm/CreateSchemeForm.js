import React, { useState } from "react";
import "./CreateSchemeForm.css";
import { useDispatch, useSelector } from "react-redux";
import { releasescheme } from "../../redux/slices/authslice.js";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateSchemeForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { message, stateerror } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eligibilityCriteria: "",
    lastDateOfSubmission: "",
    documents: [], // List of required documents
  });

  const [documentInput, setDocumentInput] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddDocument = () => {
    if (documentInput.trim() !== "") {
      setFormData((prevData) => ({
        ...prevData,
        documents: [...prevData.documents, documentInput.trim()],
      }));
      setDocumentInput(""); // Clear input field
    }
  };

  const handleRemoveDocument = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      documents: prevData.documents.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await dispatch(releasescheme(formData));

      if (result.type === releasescheme.fulfilled.type) {
        toast.success("Scheme released successfully!");
        navigate("/admin/dashboard");
      } else if (result.type === releasescheme.rejected.type) {
        toast.error(result.payload || "Some error occurred!");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Release New Scheme</h2>
      <form className="scheme-form" onSubmit={handleSubmit}>
        <label htmlFor="schemeName">Scheme Name:</label>
        <input
          type="text"
          id="schemeName"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="2"
          required
        ></textarea>

        <label htmlFor="eligibility">Eligibility Criteria:</label>
        <textarea
          id="eligibility"
          name="eligibilityCriteria"
          value={formData.eligibilityCriteria}
          onChange={handleChange}
          rows="2"
          required
        ></textarea>

        <label htmlFor="endDate">Last Date of Submission:</label>
        <input
          type="date"
          id="endDate"
          name="lastDateOfSubmission"
          value={formData.lastDateOfSubmission}
          onChange={handleChange}
          required
        />

        {/* Add Documents Input */}
        <label htmlFor="documents">Required Documents:</label>
        <div className="documents-container">
          <input
            type="text"
            id="documents"
            value={documentInput}
            onChange={(e) => setDocumentInput(e.target.value)}
            placeholder="Enter document name"
          />
          <button type="button" onClick={handleAddDocument}>
            Add
          </button>
        </div>

        {/* Display Added Documents */}
        <ul className="documents-list">
          {formData.documents.map((doc, index) => (
            <li key={index}>
              {doc}{" "}
              <button
                type="button"
                className="remove-button"
                onClick={() => handleRemoveDocument(index)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

        <button type="submit" className="submit-button">
          Create Scheme
        </button>
      </form>
    </div>
  );
};

export default CreateSchemeForm;
