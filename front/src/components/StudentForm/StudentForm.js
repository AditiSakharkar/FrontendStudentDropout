import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { studentapply } from "../../redux/slices/authslice.js";
import { toast } from "react-hot-toast";
import "./StudentForm.css";

const EnrollmentForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { schemeId } = useParams();
  const { schemes, user } = useSelector((state) => state.auth);
  
  const scheme = schemes.find((scheme) => scheme._id === schemeId);
  const application = user.applications.find((app) => app.scheme === schemeId);
  const schemename=scheme.title;

  const [documentLinks, setDocumentLinks] = useState(
    scheme?.documents?.reduce((acc, doc) => {
      acc[doc] = "";
      return acc;
    }, {}) || {}
  );

  const handleLinkChange = (doc, value) => {
    setDocumentLinks((prev) => ({
      ...prev,
      [doc]: value,
    }));
  };

  const handlesubmit = async () => {
    const incompleteLinks = Object.entries(documentLinks).filter(([_, link]) => !link.trim());

    if (incompleteLinks.length > 0) {
      return toast.error("Please provide links for all required documents.");
    }

    try {
      const formData = {
        schemename,
        schemeId: scheme._id,
        documentLinks,
      };

      const result = await dispatch(studentapply(formData));
      if (result.type === studentapply.fulfilled.type) {
        toast.success("Application successful!");
        navigate("/student/dashboard");
      } else if (result.type === studentapply.rejected.type) {
        toast.error(result.payload || "Application failed!");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
      console.error(error);
    }
  };

  if (!scheme) {
    return <div>Scheme not found.</div>;
  }

  return (
    <div className="enrollment-container">
      <h1>{scheme.title}</h1>
      <h2>Details of the Scheme</h2>
      <div className="scheme-info">
        <p><strong>Scheme ID:</strong> {scheme._id}</p>
        <p><strong>Description:</strong> {scheme.description}</p>
      </div>

      {/* Document Upload Section */}
      <h3>Provide Drive Links for Required Documents:</h3>
      {scheme.documents && scheme.documents.length > 0 ? (
        <table className="document-table">
          <thead>
            <tr>
              <th>Document Name</th>
              <th>Google Drive Link</th>
            </tr>
          </thead>
          <tbody>
            {scheme.documents.map((doc, index) => (
              <tr key={index}>
                <td>{doc}</td>
                <td>
                  <input
                    type="text"
                    placeholder="Enter Google Drive link"
                    value={documentLinks[doc] || ""}
                    onChange={(e) => handleLinkChange(doc, e.target.value)}
                    className="document-input"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No documents required for this scheme.</p>
      )}

      {application ? (
        <p><strong>Application Status:</strong> {application.status}</p>
      ) : (
        <button type="submit" onClick={handlesubmit}>Apply</button>
      )}
    </div>
  );
};

export default EnrollmentForm;
