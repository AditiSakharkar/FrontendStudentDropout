import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Contact from "./components/Contact/Contact";
import LoginAdmin from "./components/LoginAdmin/LoginAdmin";
// import Dashboard from './components/Dashboard/Dashboard';

import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import StudentDashboard from "./components/StudentDashboard/StudentDashboard";

//forms
import StudentForm from "./components/StudentForm/StudentForm";
import CreateSchemeForm from "./components/CreateSchemeForm/CreateSchemeForm";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/loginAdmin" element={<LoginAdmin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/CreateSchemeForm" element={<CreateSchemeForm />} />
        <Route path="/StudentForm" element={<StudentForm />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
