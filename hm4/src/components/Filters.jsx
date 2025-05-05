import React, { useState } from 'react';

function Filters({ onFilter, onSort }) {
  const [filter, setFilter] = useState('');

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    onFilter(e.target.value);
  };

  return (
    <div className="filters">
      <input
        type="text"
        placeholder="Filter by name..."
        value={filter}
        onChange={handleFilterChange}
      />
      <select onChange={(e) => onSort(e.target.value)}>
        <option value="">Sort By</option>
        <option value="name-asc">Name (A-Z)</option>
        <option value="name-desc">Name (Z-A)</option>
        <option value="email-asc">Email (A-Z)</option>
        <option value="email-desc">Email (Z-A)</option>
      </select>
    </div>
  );
}

export default Filters;