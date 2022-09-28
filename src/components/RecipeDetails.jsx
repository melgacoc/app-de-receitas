import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FetchDrinkDetail from '../helpers/FetchDrinkDetailAPI';
import FetchMealDetail from '../helpers/FetchMealDetailAPI';

function RecipeDetails() {
  const location = useLocation();
  const pathName = location.pathname.split('/');
  console.log(pathName);
  const mealOrDrink = pathName[1];
  const recipeId = pathName[2];

  useEffect(() => {
    if (mealOrDrink === 'meals') {
      FetchMealDetail(recipeId);
    } if (mealOrDrink === 'drinks') {
      FetchDrinkDetail(recipeId);
    }
  }, [mealOrDrink, recipeId]);

  return (
    <div>
      <h1>Recipe Details</h1>
    </div>
  );
}

export default RecipeDetails;
