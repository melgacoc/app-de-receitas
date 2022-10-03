import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import '../styles/searchBar.css';
import { useDispatch } from 'react-redux';
import fetchApiMealsFilter from '../helpers/FetchSearchBarMeals';
import fetchApiDrinksFilter from '../helpers/FetchSearchBarDrinks';
import { addRecipes } from '../redux/actions';

function SearchBar() {
  const [inputText, setInputText] = useState('');
  const [radioValue, setRadioValue] = useState('');
  const history = useHistory();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const handleFetchApi = async () => {
    const fetchApi = async () => {
      if (pathname === '/meals') {
        const resultMealsApi = await fetchApiMealsFilter({ [radioValue]: inputText });
        return resultMealsApi;
      } if (pathname === '/drinks') {
        const resultDrinksApi = await fetchApiDrinksFilter({ [radioValue]: inputText });
        return resultDrinksApi;
      }
    };
    const result = await fetchApi();
    const typeOfPathname = pathname.slice(1);
    if (result[typeOfPathname]) {
      const mealsOrDrinks = result[typeOfPathname];
      if (mealsOrDrinks.length === 1) {
        history.push(`${pathname}/${(typeOfPathname === 'meals')
          ? mealsOrDrinks[0].idMeal
          : mealsOrDrinks[0].idDrink}`);
      }
      dispatch(addRecipes(mealsOrDrinks));
    }
  };

  return (
    <div className="search-bar">
      <div className="search-bar-input">
        <input
          data-testid="search-input"
          type="text"
          placeholder="Search"
          onChange={ ({ target }) => setInputText(target.value) }
        />
      </div>
      <div className="search-bar-radios">
        <div className="search-radio">
          <h4>Ingredient</h4>
          <input
            type="radio"
            name="radio-filter"
            data-testid="ingredient-search-radio"
            onClick={ ({ target }) => setRadioValue(target.value) }
            value="ingredient"
          />
        </div>
        <div className="search-radio">
          <h4>Name</h4>
          <input
            type="radio"
            name="radio-filter"
            data-testid="name-search-radio"
            onClick={ ({ target }) => setRadioValue(target.value) }
            value="name"
          />
        </div>
        <div className="search-radio">
          <h4>First Letter</h4>
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
          className="btn btn-warning"
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
