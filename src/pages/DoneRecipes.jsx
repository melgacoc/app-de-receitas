import clipboardCopy from 'clipboard-copy';
import React, { useState } from 'react';
import '../styles/done.css';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import yellowShare from '../images/yellow-share.svg';
import allIcon from '../images/allIcon.svg';
import foodsIcon from '../images/foodsIcon.svg';
import drinksIcon from '../images/drinksIcon.svg';

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
      <div className="buttonContainer">
        <button
          className="categoryButton"
          data-testid="filter-by-all-btn"
          key="All"
          value="all"
          onClick={ filterRecipe }
          type="button"
        >
          <img src={ allIcon } alt="recipes header logo" />
        </button>
        <button
          className="categoryButton"
          data-testid="filter-by-meal-btn"
          key="Meals"
          value="meal"
          onClick={ filterRecipe }
          type="button"
        >
          <img src={ foodsIcon } alt="recipes header logo" />
        </button>
        <button
          className="categoryButton"
          data-testid="filter-by-drink-btn"
          key="Drink"
          value="drink"
          onClick={ filterRecipe }
          type="button"
        >
          <img src={ drinksIcon } alt="recipes header logo" />
        </button>
        { link && <span>Link copied!</span>}
      </div>
      <div className="recipe-body">
        { filtered && filtered.map((itens, index) => (
          <div data-testid="recipes-itens" className="recipes-itens" key={ itens.name }>
            <Link to={ `/${itens.type}s/${itens.id}` }>
              <img
                className="recipe-image"
                data-testid={ `${index}-horizontal-image` }
                src={ itens.image }
                alt={ itens.name }
              />
            </Link>
            <div className="rec-description">
              <Link to={ `/${itens.type}s/${itens.id}` }>
                <h2 data-testid={ `${index}-horizontal-name` }>{itens.name}</h2>
              </Link>
              <h4
                data-testid={ `${index}-horizontal-top-text` }
              >
                {`${itens.nationality} - ${itens.category} - ${itens.alcoholicOrNot}`}
              </h4>
              <span
                data-testid={ `${index}-horizontal-done-date` }
                className="done-date"
              >
                {`Done in ${itens.doneDate}`}
              </span>
              <button
                className="categoryButtonShare"
                data-testid={ `${index}-horizontal-share-btn` }
                key="Meals"
                type="button"
                onClick={ () => {
                  clipboardCopy(`http://localhost:3000/meals/${itens.id}`);
                  setLink(true);
                } }
                src={ yellowShare }
              >
                <img
                  src={ yellowShare }
                  alt="Share Icon"
                />
              </button>
              <div className="tag-container">
                { itens.tags.length > 0 ? itens.tags.map((tag) => (
                  <span
                    key={ tag }
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                    className="tag-value"
                  >
                    {tag}
                  </span>)) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoneRecipes;
