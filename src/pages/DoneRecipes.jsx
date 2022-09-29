import clipboardCopy from 'clipboard-copy';
import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

const doneRecipes = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];
function DoneRecipes() {
  const [link, setLink] = useState(false);
  const [filtered, setfiltered] = useState(doneRecipes);

  const filterRecipe = ({ target }) => {
    if (target.value === 'all') setfiltered(doneRecipes);
    if (target.value === 'drink') {
      setfiltered(doneRecipes.filter((recipe) => recipe.type === 'drink'));
    }
    if (target.value === 'meal') {
      setfiltered(doneRecipes.filter((recipe) => recipe.type === 'meal'));
    }
  };

  return (
    <div>
      <Header title="Done Recipes" profile="true" search="false" />
      <div>
        <button
          className="categoryButton"
          data-testid="filter-by-all-btn"
          key="All"
          value="all"
          onClick={ filterRecipe }
          type="button"
        >
          All
        </button>
        <button
          className="categoryButton"
          data-testid="filter-by-meal-btn"
          key="Meals"
          value="meal"
          onClick={ filterRecipe }
          type="button"
        >
          Meals
        </button>
        <button
          className="categoryButton"
          data-testid="filter-by-drink-btn"
          key="Drink"
          value="drink"
          onClick={ filterRecipe }
          type="button"
        >
          Drinks
        </button>
        { link && <span>Link copied!</span>}
      </div>
      { filtered && filtered.map((itens, index) => (
        <div data-testid="recipes-itens" key={ itens.name }>
          <Link to={ `/${itens.type}s/${itens.id}` }>
            <img
              width="100px"
              data-testid={ `${index}-horizontal-image` }
              src={ itens.image }
              alt={ itens.name }
            />
          </Link>
          <Link to={ `/${itens.type}s/${itens.id}` }>
            <h2 data-testid={ `${index}-horizontal-name` }>{itens.name}</h2>
          </Link>
          <h4
            data-testid={ `${index}-horizontal-top-text` }
          >
            {`${itens.nationality} - ${itens.category} - ${itens.alcoholicOrNot}`}
          </h4>
          <span data-testid={ `${index}-horizontal-done-date` }>{itens.doneDate}</span>
          <button
            className="categoryButton"
            data-testid={ `${index}-horizontal-share-btn` }
            key="Meals"
            type="button"
            onClick={ () => {
              clipboardCopy(`http://localhost:3000/meals/${itens.id}`);
              setLink(true);
            } }
            src={ shareIcon }
          >
            <img
              src={ shareIcon }
              alt="Share Icon"
            />
          </button>
          { itens.tags.length > 0 ? itens.tags.map((tag) => (
            <span
              key={ tag }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              {tag}
            </span>)) : null}
        </div>
      ))}
    </div>
  );
}

export default DoneRecipes;
