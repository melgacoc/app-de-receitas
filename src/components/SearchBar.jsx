import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import '../styles/searchBar.css';
import fetchApiMealsFilter from '../helpers/FetchSearchBarMeals';
import fetchApiDrinksFilter from '../helpers/FetchSearchBarDrinks';

function SearchBar() {
  const [inputText, setInputText] = useState('');
  const [radioValue, setRadioValue] = useState('');
  const history = useHistory();
  const { pathname } = useLocation();

  const handleFetchApi = async () => {
    const fetchApi = async () => {
      if (pathname === '/meals') {
        const resultMealsApi = await fetchApiMealsFilter({ [radioValue]: inputText });
        return resultMealsApi;
      }
      const resultDrinksApi = await fetchApiDrinksFilter({ [radioValue]: inputText });
      return resultDrinksApi;
    };
    const result = await fetchApi();
    const typeOfPathname = pathname.slice(1);
    console.log(typeOfPathname);
    if (result[typeOfPathname]) {
      const mealsOrDrinks = result[typeOfPathname];
      if (mealsOrDrinks.length === 1) {
        history.push(`${pathname}/${(typeOfPathname === 'meals')
          ? mealsOrDrinks[0].idMeal
          : mealsOrDrinks[0].idDrink}`);
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
            value="firstLetter"
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
