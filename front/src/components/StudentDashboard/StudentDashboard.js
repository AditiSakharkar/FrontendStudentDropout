import React, { useState } from 'react';
import SearchFilter from './SearchFilter';
import AppliedSchemes from './AppliedSchemes';
import UserProfile from './UserProfile';
import './Dashboard.css';

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [schemes] = useState([
    { id: 1, name: 'Scheme 1', status: 'Approved' },
    { id: 2, name: 'Scheme 2', status: 'In Progress' },
    { id: 3, name: 'Scheme 3', status: 'Approved' },
  ]);

  const filteredSchemes = schemes.filter((scheme) =>
    scheme.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="dashboard">
      <header>
        <h1>Student Dashboard</h1>
        <button className="sign-out">Sign Out</button>
      </header>
      <SearchFilter onSearch={setSearchQuery} selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />
      <div className="content">
        <UserProfile user={{ name: 'Student Name' }} />
        <AppliedSchemes schemes={filteredSchemes} />
      </div>
    </div>
  );
}

export default Dashboard;