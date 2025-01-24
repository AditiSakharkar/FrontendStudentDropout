import React, { useState } from 'react';
import './Register.css';
import { useDispatch, useSelector } from "react-redux";
import { studentSignup } from "../../redux/slices/authslice.js";
import { toast } from "react-hot-toast";

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    
  });

  const dispatch = useDispatch();
  const { message, stateerror } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
 // Dispatch the signup action
    try {
      const result = await dispatch(studentSignup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }));

      if (result.type === studentSignup.fulfilled.type) {
        
        toast.success('Registration successful!');
      } else if (result.type === studentSignup.rejected.type) {
        toast.error(result.payload || "Registration failed!");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
      console.error(error);
    }
  };

  return (
    <div className="register">
      <h3>REGISTER PAGE</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        
        <button className="register-btn" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
