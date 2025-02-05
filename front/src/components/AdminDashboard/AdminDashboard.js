


import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>

      <div className="admin-buttons">
        <button onClick={() => navigate('/CreateSchemeForm')}>New Scheme Release</button>
        <button onClick={() => navigate('/AdminBrowseScheme')}>Browse Old Scheme</button>
      </div>
    </div>
  );
}

export default Dashboard;










// import React, { useState } from 'react';
// import SearchFilter from './SearchFilter';
// import SchemeRequests from './SchemeRequests';
// import SchemeEditor from './SchemeEditor';
// import './Dashboard.css';

// function Dashboard() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedFilter, setSelectedFilter] = useState('all');
//   const [requests, setRequests] = useState([
//     { id: 1, schemeName: 'Scheme 2', studentName: 'Student A' },
//     { id: 2, schemeName: 'Scheme 2', studentName: 'Student B' },
//   ]);
//   const [newScheme, setNewScheme] = useState({ schemeName: '', studentName: '' });

//   const handleApprove = (id) => {
//     console.log('Approved request:', id);
//   };

//   const handleReject = (id) => {
//     console.log('Rejected request:', id);
//   };

//   const handleSubmitScheme = () => {
//     if (newScheme.schemeName && newScheme.studentName) {
//       setRequests([
//         ...requests,
//         { id: requests.length + 1, schemeName: newScheme.schemeName, studentName: newScheme.studentName },
//       ]);
//       setNewScheme({ schemeName: '', studentName: '' });  // Reset the form after adding
//     }
//   };

//   const handleSearch = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const handleSchemeChange = (e) => {
//     const { name, value } = e.target;
//     setNewScheme((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   return (
//     <div className="dashboard">
//       <SearchFilter
//         onSearch={handleSearch}
//         selectedFilter={selectedFilter}
//         setSelectedFilter={setSelectedFilter}
//       />

//       <div className="dashboard-content">
//         <SchemeRequests
//           requests={requests.filter((request) =>
//             request.schemeName.toLowerCase().includes(searchQuery.toLowerCase())
//           )}
//           onApprove={handleApprove}
//           onReject={handleReject}
//         />

//         <SchemeEditor
//           onSubmit={handleSubmitScheme}
//           newScheme={newScheme}
//           onChange={handleSchemeChange}
//         />
//       </div>


//     </div>
//   );
// }

// export default Dashboard;
