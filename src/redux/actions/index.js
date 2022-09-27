import {
  getMeals,
  getMealsCategory,
  getMealsByCategory,
} from '../../helpers/FetchMealsAPI';
import {
  getDrinks,
  getDrinksCategory,
  getDrinksByCategory,
} from '../../helpers/FetchDrinksAPI';

export const SEARCHBAR_STATUS = 'SEARCHBAR_STATUS';
export const ADD_RECIPES = 'ADD_RECIPES';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_FILTER = 'GET_FILTER';
export const SET_ID = 'SET_ID';

export const changeSearchBarStatus = (status) => ({ type: SEARCHBAR_STATUS, status });

export function addRecipes(payload) {
  return {
    type: ADD_RECIPES,
    payload,
  };
}

export function getCategories(payload) {
  return {
    type: GET_CATEGORIES,
    payload,
  };
}

export function getFilter(payload) {
  return {
    type: GET_FILTER,
    payload,
  };
}

export function setId(payload) {
  return {
    type: SET_ID,
    payload,
  };
}

export const fetchRecipes = (type) => async (dispatch) => {
  if (type === 'meals') {
    const meals = await getMeals();
    dispatch(addRecipes(meals.meals));
  }
  if (type === 'drinks') {
    const drinks = await getDrinks();
    dispatch(addRecipes(drinks.drinks));
  }
};

export const fetchCategories = (type) => async (dispatch) => {
  if (type === 'meals') {
    const meals = await getMealsCategory();
    dispatch(getCategories(meals.meals));
  }
  if (type === 'drinks') {
    const drinks = await getDrinksCategory();
    dispatch(getCategories(drinks.drinks));
  }
};

export const fetchByCategories = (type, cat) => async (dispatch) => {
  if (type === 'meals') {
    const meals = await getMealsByCategory(cat);
    dispatch(addRecipes(meals.meals));
  }
  if (type === 'drinks') {
    const drinks = await getDrinksByCategory(cat);
    dispatch(addRecipes(drinks.drinks));
  }
};
