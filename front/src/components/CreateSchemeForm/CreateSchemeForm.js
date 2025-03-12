import React, { useState } from "react";
import "./CreateSchemeForm.css";
import { useDispatch ,useSelector } from "react-redux";
import { releasescheme } from "../../redux/slices/authslice.js";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateSchemeForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { message, stateerror } = useSelector((state) => state.auth);
  const [formData, setformData] = useState({
    title: "",
    description: "",
    eligibilityCriteria: "",
    
    lastDateOfSubmission: ""
    
    
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    
     // Dispatch the signup action
        try {
          const result = await dispatch(releasescheme(
            formData
          ));
    
          if (result.type === releasescheme.fulfilled.type) {
            
            toast.success('Scheme released successfully!');
            navigate("/admin/dashboard")

          } else if (result.type === releasescheme.rejected.type) {
            toast.error(result.payload || "Some error occured!");
          }
        } catch (error) {
          toast.error("An unexpected error occurred.");
          console.error(error);
        }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Create New Scheme</h2>
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
          required
        ></textarea>

        <label htmlFor="eligibility">Eligibility Criteria:</label>
        <textarea
          id="eligibility"
          name="eligibilityCriteria"
          value={formData.eligibilityCriteria}
          onChange={handleChange}
          required
        ></textarea>
      { 
       /* <label htmlFor="startDate">Start Date:</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={schemeData.startDate}
          onChange={handleChange}
          required
        />*/}

        <label htmlFor="endDate">End Date:</label>
        <input
          type="date"
          id="endDate"
          name="lastDateOfSubmission"
          value={formData.lastDateOfSubmission}
          onChange={handleChange}
          required
        />

        
{/* <label htmlFor="additionalInfo">Additional Information:</label>
        <textarea
          id="additionalInfo"
          name="additionalInfo"
          value={schemeData.additionalInfo}
          onChange={handleChange}
        ></textarea>*/}
        

        <button type="submit" className="submit-button">Create Scheme</button>
      </form>
    </div>
  );
};

export default CreateSchemeForm;
