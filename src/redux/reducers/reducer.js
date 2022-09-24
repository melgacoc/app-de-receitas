import { SEARCHBAR_STATUS } from '../actions';

const INITIAL_STATE = {
  isSearchBarEnabled: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SEARCHBAR_STATUS:
    return { ...state, isSearchBarEnabled: action.status };
  default:
    return state;
  }
};

export default reducer;
