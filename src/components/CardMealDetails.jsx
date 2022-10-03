import React from 'react';
import YoutubeVideo from './YoutubeVideo';
import '../styles/CardMealDetails.css';

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
    <div className="recipe-container">
      <h1 data-testid="recipe-title">{ strMeal }</h1>
      <img src={ strMealThumb } alt={ strMeal } data-testid="recipe-photo" />
      <div className="details-container">
        <h3 data-testid="recipe-category">{ strCategory }</h3>
        <h3>Ingredients</h3>
        <ul className="ingredients-container">
          { recipesAndMeasures() }
        </ul>
        <h4>Instructions</h4>
        <h6
          className="instructions"
          data-testid="instructions"
        >
          { strInstructions }
        </h6>
        { strYoutube && YoutubeVideo(strYoutube.split('v=')[1]) }
      </div>
    </div>
  );
}

export default CardMealDetails;
