import React from 'react';
import '../styles/searchBar.css';

function SearchBar() {
  return (
    <div className="search-bar">
      <div>
        <input
          data-testid="search-input"
          type="text"
          placeholder="Search"
        />
      </div>
      <div className="search-bar-radios">
        <div>
          <span>Ingredient</span>
          <input
            type="radio"
            name="radio-filter"
            data-testid="ingredient-search-radio"
          />
        </div>
        <div>
          <span>Name</span>
          <input
            type="radio"
            name="radio-filter"
            data-testid="name-search-radio"
          />
        </div>
        <div>
          <span>First Letter</span>
          <input
            type="radio"
            name="radio-filter"
            data-testid="first-letter-search-radio"
          />
        </div>
      </div>
      <div>
        <button type="button" data-testid="exec-search-btn">Search</button>
      </div>
    </div>
  );
}

export default SearchBar;
