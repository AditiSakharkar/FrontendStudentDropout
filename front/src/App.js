import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Contact from "./components/Contact/Contact";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import StudentDashboard from "./components/StudentDashboard/StudentDashboard";
import StudentForm from "./components/StudentForm/StudentForm";
import CreateSchemeForm from "./components/CreateSchemeForm/CreateSchemeForm";
import BrowseScheme from "./components/StudentDashboard/BrowseScheme"; // Add this import
import AppliedSchemes from "./components/StudentDashboard/AppliedSchemes"; // Add this import
import AdminBrowseScheme from "./components/AdminDashboard/AdminBrowseScheme";
import SchemeDetails from "./components/AdminDashboard/SchemeDetails/SchemeDetails";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/CreateSchemeForm" element={<CreateSchemeForm />} />
        <Route path="/StudentForm" element={<StudentForm />} />
        <Route path="/BrowseScheme" element={<BrowseScheme />} /> {/* Added Route */}
        <Route path="/AppliedSchemes" element={<AppliedSchemes />} /> {/* Added Route */}
        <Route path="/AdminBrowseScheme" element={<AdminBrowseScheme />} /> {/* Added Route */}
        <Route path="/SchemeDetails" element={<SchemeDetails />} /> {/* Added Route */}
        
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
