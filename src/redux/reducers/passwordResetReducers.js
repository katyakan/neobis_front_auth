const initialState = {
  tokens: [],
  isLoading: false,
};

const passwordResetReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TOKENS':
      return { ...state, tokens: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

export default passwordResetReducer;
