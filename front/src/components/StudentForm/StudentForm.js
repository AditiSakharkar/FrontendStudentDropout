import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { studentapply } from "../../redux/slices/authslice.js";
import { toast } from "react-hot-toast";
import "./StudentForm.css";

const EnrollmentForm = () => {
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const { schemeId } = useParams(); // Get schemeId from URL params
  const { schemes, user } = useSelector((state) => state.auth);
  
  const scheme = schemes.find((scheme) => scheme._id === schemeId); // Find the selected scheme
  const application = user.applications.find((app) => app.scheme === schemeId); // Find if the student applied

  const handlesubmit = async () => {
    try {
      let formData = { schemeId: scheme._id };

      const result = await dispatch(studentapply(formData));
      if (result.type === studentapply.fulfilled.type) {
        toast.success("Application successful!");
        navigate("/student/dashboard")
      } else if (result.type === studentapply.rejected.type) {
        toast.error(result.payload || "Application failed!");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
      console.error(error);
    }
  };

  if (!scheme) {
    return <div>Scheme not found.</div>; // If the scheme doesn't exist in the store
  }

  return (
    <div className="container">
      <h1>{scheme.title}</h1>
      <h2>Details of the Scheme</h2>
      <div className="scheme-info">
        <p>
          <strong>Scheme ID:</strong> {scheme._id}
        </p>
        <p>
          <strong>Description:</strong> {scheme.description}
        </p>{" "}
        {/* Assuming your scheme has a description */}
      </div>

      {application ? (
        <p><strong>Application Status:</strong> {application.status}</p> 
      ) : (
        <button type="submit" onClick={handlesubmit}>Apply</button>
      )}
    </div>
  );
};

export default EnrollmentForm;
