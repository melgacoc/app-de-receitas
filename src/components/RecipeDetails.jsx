import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import FetchDrinkDetail from '../helpers/FetchDrinkDetailAPI';
import FetchMealDetail from '../helpers/FetchMealDetailAPI';
import CardDrinkDetails from './CardDrinkDetails';
import CardMealDetails from './CardMealDetails';

function RecipeDetails() {
  const [recipe, setRecipe] = useState([]);
  const location = useLocation();
  const pathName = location.pathname.split('/');
  const mealOrDrink = pathName[1];
  const recipeId = pathName[2];

  useEffect(() => {
    if (mealOrDrink === 'meals') {
      FetchMealDetail(recipeId, setRecipe);
    } if (mealOrDrink === 'drinks') {
      FetchDrinkDetail(recipeId, setRecipe);
    }
  }, [mealOrDrink, recipeId]);

  return (
    <div>
      { mealOrDrink === 'meals'
        ? CardMealDetails(recipe)
        : CardDrinkDetails(recipe) }
    </div>
  );
}

export default RecipeDetails;
