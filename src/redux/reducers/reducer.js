import { ADD_RECIPES, GET_CATEGORIES } from '../actions';

const INITIAL_STATE = {
  recipes: [],
  categories: [],
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_RECIPES: return {
    ...state,
    recipes: action.payload,
  };
  case GET_CATEGORIES: return {
    ...state,
    categories: action.payload,
  };
  default: return state;
  }
};

export default reducer;
