import React from 'react';

function SearchFilter({ onSearch, selectedFilter, setSelectedFilter }) {
  return (
    <div className="search-filter">
      <input 
        type="text" 
        placeholder="Search scheme" 
        onChange={(e) => onSearch(e.target.value)} 
      />
      <button className={selectedFilter === 'all' ? 'active' : ''} onClick={() => setSelectedFilter('all')}>Browse Schemes</button>
      <button className={selectedFilter === 'applied' ? 'active' : ''} onClick={() => setSelectedFilter('applied')}>Applied Schemes</button>
    </div>
  );
}

export default SearchFilter;