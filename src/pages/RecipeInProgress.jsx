import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FetchDrinkDetail from '../helpers/FetchDrinksAPI';
import FetchMealDetail from '../helpers/FetchMealsAPI';
import { getDetails } from '../redux/actions';
import '../styles/RecipeInProgress.css';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function RecipeInProgress() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const pathName = location.pathname.split('/');
  const mealOrDrink = pathName[1];
  const recipeId = pathName[2];
  const [copy, setCopy] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    if (localStorage.getItem('favoriteRecipes')) {
      return JSON.parse(localStorage.getItem('favoriteRecipes'));
    }
    return [];
  });
  const details = useSelector(({ reducer }) => reducer.details);

  useEffect(() => {
    const handleDetailsApi = async () => {
      if (mealOrDrink === 'meals') {
        dispatch(getDetails(await FetchMealDetail(recipeId)));
      } if (mealOrDrink === 'drinks') {
        dispatch(getDetails(await FetchDrinkDetail(recipeId)));
      }
    };
    handleDetailsApi();
  }, [mealOrDrink, recipeId, dispatch]);
  useEffect(() => {
    if (mealOrDrink === 'meals' && localStorage.getItem(details.idMeal)) {
      const currentList = JSON.parse(localStorage.getItem(details.idMeal));
      setIngredients(currentList);
    }
    if (mealOrDrink === 'drinks' && localStorage.getItem(details.idDrink)) {
      const currentList = JSON.parse(localStorage.getItem(details.idDrink));
      setIngredients(currentList);
    }
  }, [details.idMeal, details.idDrink, mealOrDrink]);

  const handleAddedIngredient = (event) => {
    if (mealOrDrink === 'meals') {
      if (localStorage.getItem(details.idMeal)) {
        const currentList = JSON.parse(localStorage.getItem(details.idMeal));
        setIngredients(currentList);
        currentList.push(event.target.value);
        localStorage.setItem(details.idMeal, JSON.stringify(currentList));
      } else {
        const newList = [event.target.value];
        setIngredients(newList);
        localStorage.setItem(details.idMeal, JSON.stringify(newList));
      }
    }
    if (mealOrDrink === 'drinks') {
      if (localStorage.getItem(details.idDrink)) {
        const currentList = JSON.parse(localStorage.getItem(details.idDrink));
        setIngredients(currentList);
        currentList.push(event.target.value);
        localStorage.setItem(details.idDrink, JSON.stringify(currentList));
      } else {
        const newList = [event.target.value];
        setIngredients(newList);
        localStorage.setItem(details.idDrink, JSON.stringify(newList));
      }
    }
  };

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
        id: details.idMeal,
        type: mealOrDrink,
        nationality: details.strArea,
        category: details.strCategory,
        name: details.strMeal,
        alcoholicOrNot: '',
        image: details.strMealThumb };
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
        image: details.strDrinkThumb };
      setLocalStorage(newFav);
    }
  };

  const handleFinished = () => {
    history.push('/done-recipes');
  };

  return (
    <div>
      <header>
        {mealOrDrink === 'meals'
        && (
          <div>
            <img
              data-testid="recipe-photo"
              className="thumbnail"
              src={ details.strMealThumb }
              alt={ details.strMeal }
            />
            <h1
              data-testid="recipe-title"
            >
              { details.strMeal }
            </h1>
          </div>)}
        {mealOrDrink === 'drinks'
        && (
          <div>
            <img
              data-testid="recipe-photo"
              className="thumbnail"
              src={ details.strDrinkThumb }
              alt={ details.strDrink }
            />
            <h1
              data-testid="recipe-title"
            >
              { details.strDrink }
            </h1>
          </div>)}
        <button
          data-testid="share-btn"
          type="button"
          onClick={ () => {
            navigator.clipboard.writeText(`http://localhost:3000/${mealOrDrink}/${recipeId}`);
            setCopy(true);
          } }
        >
          {(copy)
            ? <p>Link copied!</p>
            : <p>Share</p>}
        </button>
        <button
          type="button"
          onClick={ handleFavorite }
        >
          {mealOrDrink === 'drinks'
          && <img
            data-testid="favorite-btn"
            src={ favorites
              .some((fav) => fav.id === details.idDrink)
              ? blackHeartIcon : whiteHeartIcon }
            alt="Favorite icon"
          />}
          {mealOrDrink === 'meals'
          && <img
            data-testid="favorite-btn"
            src={ favorites
              .some((fav) => fav.id === details.idMeal)
              ? blackHeartIcon : whiteHeartIcon }
            alt="Favorite icon"
          />}
        </button>
        <span
          data-testid="recipe-category"
        >
          {details.strCategory}
        </span>
      </header>
      <body>
        {(details && ingredients)
          && (
            <ul>
              {
                Object.keys(details)
                  .filter((str) => (
                    str.includes('strIngredient') && details[str]
                  ))
                  .map((strIngre, strIndex) => (
                    <li key={ strIndex }>
                      <label
                        data-testid={ `${strIndex}-ingredient-step` }
                        style={ {
                          textDecoration: ingredients.includes(`${strIndex}`)
                            && 'line-through',
                        } }
                        htmlFor={ strIndex }
                      >
                        <input
                          value={ strIndex }
                          type="checkbox"
                          checked
                          // ={ ingredients.includes(`${strIndex}`) }
                          onChange={ handleAddedIngredient }
                        />
                        {details[strIngre]}
                      </label>
                    </li>))
              }
            </ul>)}
        <p
          data-testid="instructions"
        >
          {details.strInstructions}
        </p>
      </body>
      <footer>
        <button
          data-testid="finish-recipe-btn"
          type="button"
          // disabled={ checkChecked }
          onClick={ handleFinished }
        >
          Finished
        </button>
      </footer>
    </div>
  );
}

export default RecipeInProgress;
