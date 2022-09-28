import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import Footer from '../components/Footer';
import blackHeartIcon from '../images/blackHeartIcon.svg';
// import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const setLocalStorage = (newFav) => {
  if (localStorage.getItem('favoriteRecipes')
  && JSON.parse(localStorage.getItem('favoriteRecipes')).length > 0) {
    const oldFavs = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (oldFavs.some((fav) => fav.id === newFav.id)) {
      const updateOld = oldFavs.filter((fav) => fav.id !== newFav.id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(updateOld));
    } else {
      oldFavs.push(newFav);
      localStorage.setItem('favoriteRecipes', JSON.stringify(oldFavs));
    }
  } else {
    const newArrFavs = [newFav];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newArrFavs));
  }
};

const handleFavorites = () => {
  if (mealOrDrink === 'meals') {
    const newFav = {
      id: details.idMeal,
      type: mealOrDrink,
      nationality: details.strArea,
      category: details.strCategory,
      name: details.strMeal,
      alcoholicOrNot: '',
      image: details.strMealThumb,
    };
    setLocalStorage(newFav);
  }
  if (mealOrDrink === 'drinks') {
    const newFav = {
      id: details.idDrink,
      type: mealOrDrink,
      nationality: '',
      category: details.strCategory,
      name: details.strDrink,
      alcoholicOrNot: details.strAlcoholic,
      image: details.strDrinkThumb,
    };
    setLocalStorage(newFav);
  }
};

// const favRecipes = [
//   {
//     id: '52771',
//     type: 'meal',
//     nationality: 'Italian',
//     category: 'Vegetarian',
//     alcoholicOrNot: '',
//     name: 'Spicy Arrabiata Penne',
//     image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
//     doneDate: '23/06/2020',
//     tags: ['Pasta', 'Curry'],
//   },
//   {
//     id: '178319',
//     type: 'drink',
//     nationality: '',
//     category: 'Cocktail',
//     alcoholicOrNot: 'Alcoholic',
//     name: 'Aquamarine',
//     image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
//     doneDate: '23/06/2020',
//     tags: [],
//   },
// ];

function FavoriteRecipes() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('favoriteRecipes')) {
      setFavorites(JSON.parse(localStorage.getItem('favoriteRecipes')));
    }
    setFavorites(...favorites);
  }, []);

  const [link, setLink] = useState(false);
  const [favFiltered, setFavFiltered] = useState(favorites);

  const filterRecipe = ({ target }) => {
    if (target.value === 'all') setFavFiltered(favorites);
    if (target.value === 'drink') {
      setFavFiltered(favorites.filter((recipe) => recipe.type === 'drink'));
    }
    if (target.value === 'meal') {
      setFavFiltered(favorites.filter((recipe) => recipe.type === 'meal'));
    }
  };
  return (
    <>
      <Header title="Favorite Recipes" profile="true" search="false" />
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
      { favFiltered ? favFiltered.map((itens, index) => (
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
          <button
            type="button"
            key={ index }
            data-testid={ `${index}-horizontal-favorite-btn` }
            onClick={ handleFavorites }
            src={ blackHeartIcon }
          >
            <img src={ blackHeartIcon } alt="Fav Icon" />
          </button>
          { itens.tags.length > 0 ? itens.tags.map((tag) => (
            <span
              key={ tag }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              {tag}
            </span>)) : null}
        </div>
      )) : null}
      <Footer />
    </>
  );
}

export default FavoriteRecipes;
