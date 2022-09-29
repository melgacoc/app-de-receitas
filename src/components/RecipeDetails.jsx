import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import FetchDrinkDetail from '../helpers/FetchDrinkDetailAPI';
import FetchMealDetail from '../helpers/FetchMealDetailAPI';
import { getMeals } from '../helpers/FetchMealsAPI';
import { getDrinks } from '../helpers/FetchDrinksAPI';
import CardDrinkDetails from './CardDrinkDetails';
import CardMealDetails from './CardMealDetails';
import RecommendedCards from './RecommendedCards';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function RecipeDetails() {
  const [recipe, setRecipe] = useState([]);
  const [recommendedRecipes, setRecommendedRecips] = useState([]);
  const [link, setLink] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    if (localStorage.getItem('favoriteRecipes')) {
      return JSON.parse(localStorage.getItem('favoriteRecipes'));
    } return [];
  });
  const history = useHistory();
  const location = useLocation();
  const pathName = location.pathname.split('/');
  const mealOrDrink = pathName[1];
  const recipeId = pathName[2];

  const doneRecipesStoraged = localStorage.getItem('doneRecipes') || 'empty';
  const inDoneRecipesStoraged = localStorage
    .getItem('inProgressRecipes') || 'empty';

  const NUMBER_SIX = 6;

  const recipesFiltered = recommendedRecipes.slice(0, NUMBER_SIX);

  useEffect(() => {
    const fetchData = async () => {
      if (mealOrDrink === 'meals') {
        const data = await getDrinks();
        setRecommendedRecips(data.drinks);
      } if (mealOrDrink === 'drinks') {
        const data = await getMeals();
        setRecommendedRecips(data.meals);
      }
    };
    fetchData();
  }, [mealOrDrink]);

  useEffect(() => {
    if (mealOrDrink === 'meals') {
      FetchMealDetail(recipeId, setRecipe);
    } if (mealOrDrink === 'drinks') {
      FetchDrinkDetail(recipeId, setRecipe);
    }
  }, [mealOrDrink, recipeId]);

  const setLocalStorage = (newFav) => {
    if (localStorage.getItem('favoriteRecipes')
      && JSON.parse(localStorage.getItem('favoriteRecipes')).length > 0) {
      const oldFavs = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (oldFavs.some((fav) => fav.id === newFav.id)) {
        const updateOld = oldFavs.filter((fav) => fav.id !== newFav.id);
        setFavorites(updateOld);
        localStorage.setItem('favoriteRecipes', JSON.stringify(updateOld));
      } else {
        oldFavs.push(newFav);
        setFavorites(oldFavs);
        localStorage.setItem('favoriteRecipes', JSON.stringify(oldFavs));
      }
    } else {
      const newArrayFavs = [newFav];
      setFavorites(newArrayFavs);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newArrayFavs));
    }
  };

  const handleFavorite = () => {
    if (mealOrDrink === 'meals') {
      const newFav = {
        id: recipe.idMeal,
        type: 'meal',
        nationality: recipe.strArea,
        category: recipe.strCategory,
        name: recipe.strMeal,
        alcoholicOrNot: '',
        image: recipe.strMealThumb };
      setLocalStorage(newFav);
    }
    if (mealOrDrink === 'drinks') {
      const newFav = {
        id: recipe.idDrink,
        type: 'drink',
        nationality: '',
        category: recipe.strCategory,
        name: recipe.strDrink,
        alcoholicOrNot: recipe.strAlcoholic,
        image: recipe.strDrinkThumb };
      setLocalStorage(newFav);
    }
  };

  return (
    <div>
      { mealOrDrink === 'meals'
        ? CardMealDetails(recipe)
        : CardDrinkDetails(recipe) }
      { RecommendedCards(recipesFiltered) }
      <div>
        <div>
          <button
            type="button"
            data-testid="share-btn"
            onClick={ () => {
              clipboardCopy(`http://localhost:3000${location.pathname}`);
              setLink(true);
            } }
            src={ shareIcon }
          >
            <img
              src={ shareIcon }
              alt="Share Icon"
            />
          </button>
          { link && <span>Link copied!</span>}
        </div>
        <button
          type="button"
          onClick={ handleFavorite }
        >
          <img
            data-testid="favorite-btn"
            src={ favorites.some((fav) => fav.id === recipeId)
              ? blackHeartIcon : whiteHeartIcon }
            alt="Favorite icon"
          />
        </button>
      </div>
      <div className="start-recipe-container">
        { doneRecipesStoraged === 'empty'
        && (
          <button
            type="button"
            data-testid="start-recipe-btn"
            onClick={ () => history.push(`${location.pathname}/in-progress`) }
            className="start-recipe-button"
          >
            { inDoneRecipesStoraged === 'empty'
              ? 'Start Recipe'
              : 'Continue Recipe' }
          </button>
        ) }
      </div>
    </div>
  );
}

export default RecipeDetails;
