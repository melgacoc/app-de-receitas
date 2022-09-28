import React from 'react';
import YoutubeVideo from './YoutubeVideo';

function CardMealDetails(recipe) {
  const { strMeal, strMealThumb, strCategory, strInstructions, strYoutube, strIngredient1,
    strIngredient2, strIngredient3, strIngredient4, strIngredient5,
    strIngredient6, strIngredient7, strIngredient8, strIngredient9,
    strIngredient10, strIngredient11, strIngredient12, strIngredient13,
    strIngredient14, strIngredient15, strIngredient16, strIngredient17,
    strIngredient18, strIngredient19, strIngredient20, strMeasure1,
    strMeasure2, strMeasure3, strMeasure4, strMeasure5,
    strMeasure6, strMeasure7, strMeasure8, strMeasure9,
    strMeasure10, strMeasure11, strMeasure12, strMeasure13,
    strMeasure14, strMeasure15, strMeasure16, strMeasure17,
    strMeasure18, strMeasure19, strMeasure20,
  } = recipe;
  return (
    <div>
      <h1 data-testid="recipe-title">{ strMeal }</h1>
      <img src={ strMealThumb } alt={ strMeal } data-testid="recipe-photo" />
      <h3 data-testid="recipe-category">{ strCategory }</h3>
      <ul>
        <li data-testid="0-ingredient-name-and-measure">
          {`${strIngredient1} ${strMeasure1}`}
        </li>
        <li data-testid="1-ingredient-name-and-measure">
          {`${strIngredient2} ${strMeasure2}`}
        </li>
        <li data-testid="2-ingredient-name-and-measure">
          {`${strIngredient3} ${strMeasure3}`}
        </li>
        <li data-testid="3-ingredient-name-and-measure">
          {`${strIngredient4} ${strMeasure4}`}
        </li>
        <li data-testid="4-ingredient-name-and-measure">
          {`${strIngredient5} ${strMeasure5}`}
        </li>
        <li data-testid="5-ingredient-name-and-measure">
          {`${strIngredient6} ${strMeasure6}`}
        </li>
        <li data-testid="6-ingredient-name-and-measure">
          {`${strIngredient7} ${strMeasure7}`}
        </li>
        <li data-testid="7-ingredient-name-and-measure">
          {`${strIngredient8} ${strMeasure8}`}
        </li>
        <li data-testid="8-ingredient-name-and-measure">
          {`${strIngredient9} ${strMeasure9}`}
        </li>
        <li data-testid="9-ingredient-name-and-measure">
          {`${strIngredient10} ${strMeasure10}`}
        </li>
        <li data-testid="10-ingredient-name-and-measure">
          {`${strIngredient11} ${strMeasure11}`}
        </li>
        <li data-testid="11-ingredient-name-and-measure">
          {`${strIngredient12} ${strMeasure12}`}
        </li>
        <li data-testid="12-ingredient-name-and-measure">
          {`${strIngredient13} ${strMeasure13}`}
        </li>
        <li data-testid="13-ingredient-name-and-measure">
          {`${strIngredient14} ${strMeasure14}`}
        </li>
        <li data-testid="14-ingredient-name-and-measure">
          {`${strIngredient15} ${strMeasure15}`}
        </li>
        <li data-testid="15-ingredient-name-and-measure">
          {`${strIngredient16} ${strMeasure16}`}
        </li>
        <li data-testid="16-ingredient-name-and-measure">
          {`${strIngredient17} ${strMeasure17}`}
        </li>
        <li data-testid="17-ingredient-name-and-measure">
          {`${strIngredient18} ${strMeasure18}`}
        </li>
        <li data-testid="18-ingredient-name-and-measure">
          {`${strIngredient19} ${strMeasure19}`}
        </li>
        <li data-testid="19-ingredient-name-and-measure">
          {`${strIngredient20} ${strMeasure20}`}
        </li>
      </ul>
      <h6 data-testid="instructions">{ strInstructions }</h6>
      { strYoutube && YoutubeVideo(strYoutube.split('v=')[1]) }
    </div>
  );
}

export default CardMealDetails;
