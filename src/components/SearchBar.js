import React from 'react';

function SearchBar({ searchTerm, onSearchChange, onClearSearch }) {
  return (
    <div className="search-bar">
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Search events by title, description, or category..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
        {searchTerm && (
          <button 
            onClick={onClearSearch}
            className="clear-search-btn"
            type="button"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
