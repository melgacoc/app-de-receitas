const INITIAL_STATE = {
  name: '',
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'REDUCER': return {
    ...state,
  };
  default: return state;
  }
};

export default reducer;
