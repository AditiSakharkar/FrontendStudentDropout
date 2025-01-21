import React, { useState } from 'react';
import SearchFilter from './SearchFilter';
import SchemeRequests from './SchemeRequests';
import SchemeEditor from './SchemeEditor';
import './Dashboard.css';

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [requests, setRequests] = useState([
    { id: 1, schemeName: 'Scheme 2', studentName: 'Student A' },
    { id: 2, schemeName: 'Scheme 2', studentName: 'Student B' },
  ]);

  const handleApprove = (id) => {
    console.log('Approve request:', id);
  };

  const handleReject = (id) => {
    console.log('Reject request:', id);
  };

  const handleSubmitScheme = (scheme) => {
    console.log('New scheme added:', scheme);
  };

   // Use the setSearchQuery or searchQuery somewhere
   const handleSearch = (event) => {
    setSearchQuery(event.target.value); // Use setSearchQuery here
  };

  // Use setRequests to update the state
  const addRequest = () => {
    setRequests([...requests, { id: requests.length + 1, name: 'New Request' }]);
  };


  return (
    <div className="dashboard">
      <header>
        <h1>SHIKSHA SETU - Student Portal</h1>
      </header>
      <SearchFilter
        onSearch={setSearchQuery}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
      <div className="dashboard-content">
        <SchemeRequests
          requests={requests}
          onApprove={handleApprove}
          onReject={handleReject}
        />
        <SchemeEditor onSubmit={handleSubmitScheme} />
      </div>

      <h1>Admin Dashboard</h1>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search..."
      />
      <button onClick={addRequest}>Add Request</button>
      <ul>
        {requests.map((request) => (
          <li key={request.id}>{request.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;