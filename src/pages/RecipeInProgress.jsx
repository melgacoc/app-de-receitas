import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import clipboardCopy from 'clipboard-copy';
import FetchDrinkDetail from '../helpers/FetchDrinksAPI';
import FetchMealDetail from '../helpers/FetchMealsAPI';
import { getDetails } from '../redux/actions';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import createDone from '../helpers/recipeInProgressHelp';

function RecipeInProgress() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const pathName = location.pathname.split('/');
  const mealOrDrink = pathName[1];
  const recipeId = pathName[2];
  const [copy, setCopy] = useState(false);
  const [finished, setFinished] = useState([true]);
  const [allIng, setAllIng] = useState([]);
  const checkIfFinished = (getObject) => {
    if (allIng.every((ing) => getObject.includes(ing))) { setFinished(false); }
  };
  const [ingredients, setIngredients] = useState(() => {
    if (localStorage.getItem('inProgressRecipes')
      && JSON.parse(localStorage.getItem('inProgressRecipes')).some((N) => N[recipeId])) {
      const currentIng = JSON.parse(localStorage.getItem('inProgressRecipes'));
      checkIfFinished(currentIng.filter((N) => N[recipeId])[0][recipeId]);
      return currentIng.filter((N) => N[recipeId])[0][recipeId];
    } return [];
  });
  const [favorites, setFavorites] = useState(() => {
    if (localStorage.getItem('favoriteRecipes')) {
      return JSON.parse(localStorage.getItem('favoriteRecipes'));
    } return [];
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
    const keysForIng = Object.keys(details)
      .filter((str) => (str.includes('strIngredient') && details[str]));
    const tempIng = [];
    keysForIng.map((keyV) => tempIng.push(details[keyV]));
    setAllIng(tempIng);
  }, [details.idMeal, details.idDrink, mealOrDrink, details]);

  const handleAddedIngredient = (event) => {
    setIngredients([...ingredients, event.target.value]);
    if (localStorage.getItem('inProgressRecipes')) {
      const oldIngs = (JSON.parse(localStorage.getItem('inProgressRecipes')));
      if (oldIngs.some((objectN) => objectN[recipeId])) {
        oldIngs
          .filter((N) => N[recipeId])[0][recipeId] = [...ingredients, event.target.value];
        localStorage.setItem('inProgressRecipes', JSON.stringify(oldIngs));
        checkIfFinished(oldIngs.filter((N) => N[recipeId])[0][recipeId]);
      } else {
        const newObject = {};
        newObject[recipeId] = [event.target.value];
        oldIngs.push(newObject);
        localStorage.setItem('inProgressRecipes', JSON.stringify(oldIngs));
      }
    } else {
      const newObject = {};
      newObject[recipeId] = [event.target.value];
      const newArray = [newObject];
      localStorage.setItem('inProgressRecipes', JSON.stringify(newArray));
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
        type: 'meal',
        nationality: details.strArea,
        category: details.strCategory,
        alcoholicOrNot: '',
        name: details.strMeal,
        image: details.strMealThumb };
      setLocalStorage(newFav);
    }
    if (mealOrDrink === 'drinks') {
      const newFav = {
        id: details.idDrink,
        type: 'drink',
        nationality: '',
        category: details.strCategory,
        alcoholicOrNot: details.strAlcoholic,
        name: details.strDrink,
        image: details.strDrinkThumb };
      setLocalStorage(newFav);
    }
  };
  const handleFinished = () => {
    console.log('oi');
    createDone(details, mealOrDrink);
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
        <div>
          <button
            type="button"
            data-testid="share-btn"
            onClick={ () => {
              clipboardCopy(`http://localhost:3000/${mealOrDrink}/${recipeId}`);
              setCopy(true);
            } }
          >
            Copy link
          </button>
          {copy && <span>Link copied!</span>}
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
        <span
          data-testid="recipe-category"
        >
          {details.strCategory}
        </span>
      </header>
      <body>
        {(details && allIng)
            && (
              <ul>
                {allIng
                  .map((strIngre, strIndex) => (
                    <li key={ strIndex }>
                      <label
                        data-testid={ `${strIndex}-ingredient-step` }
                        style={ {
                          textDecoration: ingredients.includes(`${strIngre}`)
                              && 'line-through',
                        } }
                        htmlFor={ strIndex }
                        onChange={ handleAddedIngredient }
                      >
                        <input
                          value={ strIngre }
                          type="checkbox"
                          checked={ ingredients.includes(`${strIngre}`) }
                          onChange={ handleAddedIngredient }
                        />
                        {strIngre}
                      </label>
                    </li>))}
              </ul>)}
        <p data-testid="instructions">
          {details.strInstructions}
        </p>
      </body>
      <footer>
        <button
          data-testid="finish-recipe-btn"
          type="button"
          disabled={ finished }
          onClick={ () => handleFinished }
        >
          Finished
        </button>
      </footer>
    </div>
  );
}
export default RecipeInProgress;
