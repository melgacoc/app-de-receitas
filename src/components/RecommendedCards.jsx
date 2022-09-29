import React from 'react';
import '../styles/recommendedCards.css';
import Carousel from 'react-bootstrap/Carousel';

function RecommendedCards(recipesFiltered) {
  const recommendedRecipesReceived = recipesFiltered;
  const recipesFilteredHtmlElements = recommendedRecipesReceived.map((recipe, index) => {
    const { idDrink, idMeal, strDrink, strMeal, strDrinkThumb, strMealThumb } = recipe;
    return (
      <div
        key={ idDrink || idMeal }
        data-testid={ `${index}-recommendation-card` }
        className="carousel-card"
      >
        <h4 data-testid={ `${index}-recommendation-title` }>
          { strDrink || strMeal }
        </h4>
        <img src={ strDrinkThumb || strMealThumb } alt={ strDrink || strMeal } />
      </div>
    );
  });
  return (
    <Carousel>
      <Carousel.Item>
        <div className="cards-container">
          { recipesFilteredHtmlElements[0]}
          { recipesFilteredHtmlElements[1]}
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="cards-container">
          { recipesFilteredHtmlElements[2]}
          { recipesFilteredHtmlElements[3]}
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="cards-container">
          { recipesFilteredHtmlElements[4]}
          { recipesFilteredHtmlElements[5]}
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default RecommendedCards;
