import { getMeals, getMealsCategory } from '../../helpers/FetchMealsAPI';
import { getDrinks, getDrinksCategory } from '../../helpers/FetchDrinksAPI';

export const SEARCHBAR_STATUS = 'SEARCHBAR_STATUS';
export const ADD_RECIPES = 'ADD_RECIPES';
export const GET_CATEGORIES = 'GET_CATEGORIES';

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

export const fetchRecipes = (type) => async (dispatch) => {
  if (type === 'meals') {
    const meals = await getMeals();
    await dispatch(addRecipes(meals.meals));
  }
  if (type === 'drinks') {
    const drinks = await getDrinks();
    await dispatch(addRecipes(drinks.drinks));
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
