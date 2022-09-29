import {
  SEARCHBAR_STATUS,
  ADD_RECIPES,
  GET_CATEGORIES,
  GET_FILTER,
} from '../actions';

const INITIAL_STATE = {
  isSearchBarEnabled: false,
  categorieFilter: '',
  recipes: [],
  categories: [],
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SEARCHBAR_STATUS:
    return { ...state, isSearchBarEnabled: action.status };
  case ADD_RECIPES: return {
    ...state,
    recipes: action.payload,
  };
  case GET_CATEGORIES: return {
    ...state,
    categories: action.payload,
  };
  case GET_FILTER: return {
    ...state,
    categorieFilter: action.payload,
  };
  default: return state;
  }
};

export default reducer;
