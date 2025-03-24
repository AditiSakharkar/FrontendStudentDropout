import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateStudentDetails } from '../../../redux/slices/authslice';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './Fulldetails.css';

const Fulldetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const initialData = {
    name: user?.name || '',
    dob: user?.dob ? new Date(user.dob).toISOString().split('T')[0] : '',
    phone: user?.phone || '',
    address: user?.address || '',
    state: user?.state || '',
    district: user?.district || '',
    resumeLink: user?.resumeLink || '',
    education: user?.education || [],
    dropoutDetails: user?.dropoutDetails || {}
  };

  const [formData, setFormData] = useState(initialData);
  const [newEducation, setNewEducation] = useState(null); // Store new education details temporarily

  // Handle Change for Existing Data
  const handleChange = (e, index, type) => {
    if (type === 'education') {
      const updatedEducation = [...formData.education];
      updatedEducation[index][e.target.name] = e.target.value;
      setFormData({ ...formData, education: updatedEducation });
    } else if (type === 'dropout') {
      setFormData({ 
        ...formData, 
        dropoutDetails: { ...formData.dropoutDetails, [e.target.name]: e.target.value } 
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Handle New Education Input
  const handleNewEducationChange = (e) => {
    setNewEducation({
      ...newEducation,
      [e.target.name]: e.target.value
    });
  };

  // Add New Education
  const addEducation = () => {
    setNewEducation({ course: '', marks: '', yearCompleted: '', field: '' });
  };

  // Save New Education to List
  const saveEducation = () => {
    if (!newEducation?.course || !newEducation?.marks || !newEducation?.yearCompleted || !newEducation?.field) {
      toast.error('All education fields are required!');
      return;
    }
    setFormData((prevState) => ({
      ...prevState,
      education: [...prevState.education, newEducation]
    }));
    setNewEducation(null); // Reset after saving
    toast.success('Education added!');
  };

  // Remove Existing Education
  const removeEducation = (index) => {
    const updatedEducation = [...formData.education];
    updatedEducation.splice(index, 1);
    setFormData({ ...formData, education: updatedEducation });
    toast.success('Education removed!');
  };

  // Submit Form Data
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(updateStudentDetails({ studentId: user._id, updatedData: formData }));
      toast.success('Profile updated successfully!');
      navigate('/ShowDetails');
    } catch (error) {
      console.error('Error updating details:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile');
    }
  };

  return (
    <div id="fulldetails-container">
      <h2>Edit Your Details</h2>
      <form id="fulldetails-form" onSubmit={handleSubmit}>

        {/* Personal Details */}
        <h3>Personal Details</h3>
        {['name', 'phone', 'address', 'state', 'district', 'resumeLink'].map((field) => (
          <label key={field} className="fulldetails-label">
            {field.charAt(0).toUpperCase() + field.slice(1)}: 
            <input name={field} value={formData[field]} onChange={handleChange} className="fulldetails-input" />
          </label>
        ))}

        {/* Date of Birth with Date Input */}
        <label className="fulldetails-label">
          Date of Birth: 
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="fulldetails-input"
          />
        </label>

        {/* Education Details */}
        <h3>Education</h3>
        <div id="education-section">
          {formData.education.map((edu, index) => (
            <div className="education-card" key={index}>
              {['course', 'marks', 'yearCompleted', 'field'].map((eduField) => (
                <label key={eduField} className="fulldetails-label">
                  {eduField.charAt(0).toUpperCase() + eduField.slice(1)}: 
                  <input 
                    name={eduField} 
                    value={edu[eduField]} 
                    onChange={(e) => handleChange(e, index, 'education')} 
                    className="fulldetails-input"
                  />
                </label>
              ))}
              <button type="button" onClick={() => removeEducation(index)} className="remove-edu-btn">Remove</button>
            </div>
          ))}
        </div>

        {/* Add New Education Section */}
        {newEducation ? (
          <div className="education-card">
            {['course', 'marks', 'yearCompleted', 'field'].map((eduField) => (
              <label key={eduField} className="fulldetails-label">
                {eduField.charAt(0).toUpperCase() + eduField.slice(1)}: 
                <input 
                  name={eduField} 
                  value={newEducation[eduField] || ''} 
                  onChange={handleNewEducationChange} 
                  className="fulldetails-input"
                />
              </label>
            ))}
            <button type="button" onClick={saveEducation} className="save-edu-btn">Save</button>
          </div>
        ) : (
          <button type="button" onClick={addEducation} className="add-edu-btn">Add Education</button>
        )}

        {/* Dropout Details */}
        <h3>Dropout Details</h3>
        <div id="dropout-section">
          {['dropoutCourse', 'dropoutYear', 'dropoutInstitute', 'dropoutReason'].map((dropField) => (
            <label key={dropField} className="fulldetails-label">
              {dropField.replace('dropout', '').replace(/([A-Z])/g, ' $1').trim() || 'NA'}: 
              <input 
                name={dropField} 
                value={formData.dropoutDetails[dropField] || ''} 
                onChange={(e) => handleChange(e, null, 'dropout')} 
                className="fulldetails-input"
              />
            </label>
          ))}
        </div>

        <button type="submit" id="fulldetails-submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Fulldetails;
