import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/searchBar.css';
import fetchApiMealsFilter from '../helpers/FetchMealsAPI';
import fetchApiDrinksFilter from '../helpers/FetchDrinksAPI';

function SearchBar() {
  const [inputText, setInputText] = useState('');
  const [radioValue, setRadioValue] = useState('');

  const { pathname } = useLocation();

  const handleFetchApi = () => {
    if (pathname === '/meals') {
      if (radioValue === 'ingredient') {
        return fetchApiMealsFilter(inputText, null, null);
      } if (radioValue === 'name') {
        return fetchApiMealsFilter(null, inputText, null);
      } if (radioValue === 'first-letter') {
        return fetchApiMealsFilter(null, null, inputText);
      }
    } else if (pathname === '/drinks') {
      if (radioValue === 'ingredient') {
        return fetchApiDrinksFilter(inputText, null, null);
      } if (radioValue === 'name') {
        return fetchApiDrinksFilter(null, inputText, null);
      } if (radioValue === 'first-letter') {
        return fetchApiDrinksFilter(null, null, inputText);
      }
    }
  };

  return (
    <div className="search-bar">
      <div>
        <input
          data-testid="search-input"
          type="text"
          placeholder="Search"
          onChange={ ({ target }) => setInputText(target.value) }
        />
      </div>
      <div className="search-bar-radios">
        <div>
          <span>Ingredient</span>
          <input
            type="radio"
            name="radio-filter"
            data-testid="ingredient-search-radio"
            onClick={ ({ target }) => setRadioValue(target.value) }
            value="ingredient"
          />
        </div>
        <div>
          <span>Name</span>
          <input
            type="radio"
            name="radio-filter"
            data-testid="name-search-radio"
            onClick={ ({ target }) => setRadioValue(target.value) }
            value="name"
          />
        </div>
        <div>
          <span>First Letter</span>
          <input
            type="radio"
            name="radio-filter"
            data-testid="first-letter-search-radio"
            onClick={ ({ target }) => setRadioValue(target.value) }
            value="first-letter"
          />
        </div>
      </div>
      <div>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ () => handleFetchApi() }
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
