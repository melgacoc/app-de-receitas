import React from 'react';
import '../styles/Recipes.css';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { fetchRecipes, getFilter, fetchByCategories } from '../redux/actions';

const MAX_NUMBER_RECIPES = 11;
const MAX_NUMBER_CATEGORIES = 4;

function Recipes({ type, recipes, categories, categorieFilter }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { pathname } = useLocation();
  const handleCatFilter = (event) => {
    if (categorieFilter === event.target.value) {
      dispatch(fetchRecipes(type));
      dispatch(getFilter(''));
    } else {
      dispatch(getFilter(event.target.value));
      dispatch(fetchByCategories(type, event.target.value));
    }
  };
  const handleAllFilter = () => {
    dispatch(getFilter(''));
    dispatch(fetchRecipes(type));
  };
  const handleRecipeDetails = (event) => {
    history.push(`${pathname}/${event.target.name}`);
  };
  return (
    <div>
      <div id="categories" key="categories">
        {categories
          .filter((cat, index) => (
            index <= MAX_NUMBER_CATEGORIES
          ))
          .map((cat, index) => (
            <button
              className="categoryButton"
              data-testid={ `${cat.strCategory}-category-filter` }
              onClick={ handleCatFilter }
              key={ index }
              value={ cat.strCategory }
              type="button"
            >
              {cat.strCategory}
            </button>
          ))}
        <button
          className="categoryButton"
          data-testid="All-category-filter"
          onClick={ handleAllFilter }
          type="button"
        >
          All
        </button>
      </div>
      <div id="meal-recipes" key="meal-recipes">
        {type === 'meals'
          && recipes
            .filter((_, index) => (
              index <= MAX_NUMBER_RECIPES
            ))
            .map((rec, index) => (
              <button
                type="button"
                className="recipeButton"
                data-testid={ `${index}-recipe-card` }
                key={ rec.idMeal }
                name={ rec.idMeal }
                onClick={ handleRecipeDetails }
              >
                <img
                  data-testid={ `${index}-card-img` }
                  className="thumbnail"
                  src={ rec.strMealThumb }
                  alt={ rec.strMeal }
                  name={ rec.idMeal }
                />
                <span
                  data-testid={ `${index}-card-name` }
                  name={ rec.idMeal }
                >
                  { rec.strMeal }
                </span>
              </button>
            ))}
      </div>
      <div id="drinks-recipes" key="drinks-recipes">
        {type === 'drinks'
          && recipes
            .filter((_, index) => (
              index <= MAX_NUMBER_RECIPES
            ))
            .map((rec, index) => (
              <button
                type="button"
                className="recipeButton"
                data-testid={ `${index}-recipe-card` }
                key={ rec.idDrink }
                name={ rec.idDrink }
                onClick={ handleRecipeDetails }
              >
                <img
                  data-testid={ `${index}-card-img` }
                  className="thumbnail"
                  src={ rec.strDrinkThumb }
                  alt={ rec.strDrink }
                  name={ rec.idDrink }
                />
                <span
                  data-testid={ `${index}-card-name` }
                  name={ rec.idDrink }
                >
                  { rec.strDrink }
                </span>
              </button>
            ))}
      </div>
    </div>
  );
}

Recipes.propTypes = {
  recipes: PropTypes.instanceOf(Object).isRequired,
  categories: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
  categorieFilter: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  recipes: state.reducer.recipes,
  categories: state.reducer.categories,
  categorieFilter: state.reducer.categorieFilter,
});

export default connect(mapStateToProps, null)(Recipes);
