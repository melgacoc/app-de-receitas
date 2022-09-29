import React from 'react';
import YoutubeVideo from './YoutubeVideo';

function CardMealDetails(recipe) {
  const { strMeal, strMealThumb, strCategory, strInstructions, strYoutube,
  } = recipe;

  const getRecipes = Object.entries(recipe)
    .filter((kV) => kV[0].includes('strIngredient'))
    .filter((kV) => kV[1] !== '');
  const getMeasures = Object.entries(recipe).filter((kV) => kV[0].includes('strMeasure'))
    .filter((kV) => kV[1] !== '');

  const recipesAndMeasures = () => {
    const result = [];
    for (let i = 0; i < getRecipes.length; i += 1) {
      result.push(
        <li data-testid={ `${i}-ingredient-name-and-measure` } key={ i }>
          { `${getRecipes[i][1]} ${getMeasures[i] && getMeasures[i][1]}` }
        </li>,
      );
    }
    return result;
  };
  return (
    <div>
      <h1 data-testid="recipe-title">{ strMeal }</h1>
      <img src={ strMealThumb } alt={ strMeal } data-testid="recipe-photo" />
      <h3 data-testid="recipe-category">{ strCategory }</h3>
      <ul>
        { recipesAndMeasures() }
      </ul>
      <h6 data-testid="instructions">{ strInstructions }</h6>
      { strYoutube && YoutubeVideo(strYoutube.split('v=')[1]) }
    </div>
  );
}

export default CardMealDetails;
