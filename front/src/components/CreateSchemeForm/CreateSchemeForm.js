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
    issuingBody: "",
    lastDateOfSubmission: "",
    schemeType: "",
    amountOrSupport: "",
    applicationProcess: "",
    selectionProcess: "",
    durationOfSupport: "",
    termsAndConditions: "",
    contactInformation: "",
    regionSpecific: "",
    documents: [],
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
    if (documentInput.trim()) {
      setFormData((prevData) => ({
        ...prevData,
        documents: [...prevData.documents, documentInput.trim()],
      }));
      setDocumentInput("");
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

        <label htmlFor="issuingBody">Issuing Body:</label>
        <input
          type="text"
          id="issuingBody"
          name="issuingBody"
          value={formData.issuingBody}
          onChange={handleChange}
        />

        <label htmlFor="endDate">Last Date of Submission:</label>
        <input
          type="date"
          id="endDate"
          name="lastDateOfSubmission"
          value={formData.lastDateOfSubmission}
          onChange={handleChange}
        />

        <label htmlFor="schemeType">Scheme Type:</label>
        <select
          id="schemeType"
          name="schemeType"
          value={formData.schemeType}
          onChange={handleChange}
        >
          <option value="">Select Scheme Type</option>
          <option value="Scholarship">Scholarship</option>
          <option value="Loan">Loan</option>
          <option value="Grant">Grant</option>
          <option value="Other">Other</option>
        </select>

        <label htmlFor="amountOrSupport">Amount or Support Provided:</label>
        <input
          type="text"
          id="amountOrSupport"
          name="amountOrSupport"
          value={formData.amountOrSupport}
          onChange={handleChange}
        />

        <label htmlFor="applicationProcess">Application Process:</label>
        <textarea
          id="applicationProcess"
          name="applicationProcess"
          value={formData.applicationProcess}
          onChange={handleChange}
        ></textarea>

        <label htmlFor="selectionProcess">Selection Process:</label>
        <textarea
          id="selectionProcess"
          name="selectionProcess"
          value={formData.selectionProcess}
          onChange={handleChange}
        ></textarea>

        <label htmlFor="durationOfSupport">Duration of Support:</label>
        <input
          type="text"
          id="durationOfSupport"
          name="durationOfSupport"
          value={formData.durationOfSupport}
          onChange={handleChange}
        />

        <label htmlFor="termsAndConditions">Terms and Conditions:</label>
        <textarea
          id="termsAndConditions"
          name="termsAndConditions"
          value={formData.termsAndConditions}
          onChange={handleChange}
        ></textarea>

        <label htmlFor="contactInformation">Contact Information:</label>
        <input
          type="text"
          id="contactInformation"
          name="contactInformation"
          value={formData.contactInformation}
          onChange={handleChange}
        />

        <label htmlFor="regionSpecific">Region Specific (if any):</label>
        <input
          type="text"
          id="regionSpecific"
          name="regionSpecific"
          value={formData.regionSpecific}
          onChange={handleChange}
        />

        {/* Documents Section */}
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

        <ul className="documents-list">
          {formData.documents.map((doc, index) => (
            <li key={index}>
              {doc}
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
