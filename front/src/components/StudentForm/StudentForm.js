import React, { useState } from "react";
import "./StudentForm.css";

const EnrollmentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    scheme: "",
    address: "",
    comments: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Your enrollment request has been submitted successfully!");
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Scheme Enrollment Form</h2>
      <form className="enrollment-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Full Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="phone">Phone Number:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <label htmlFor="dob">Date of Birth:</label>
        <input
          type="date"
          id="dob"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          required
        />

        <label htmlFor="scheme">Select Scheme:</label>
        <select
          id="scheme"
          name="scheme"
          value={formData.scheme}
          onChange={handleChange}
          required
        >
          <option value="">--Choose a Scheme--</option>
          <option value="Scholarship">Scholarship</option>
          <option value="Internship">Internship</option>
          <option value="Skill Development">Skill Development</option>
          <option value="Financial Aid">Financial Aid</option>
        </select>

        <label htmlFor="address">Address:</label>
        <textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        ></textarea>

        <label htmlFor="comments">Additional Comments:</label>
        <textarea
          id="comments"
          name="comments"
          value={formData.comments}
          onChange={handleChange}
        ></textarea>

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default EnrollmentForm;
