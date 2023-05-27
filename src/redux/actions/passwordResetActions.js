export const setTokens = (tokens) => ({
  type: 'SET_TOKENS',
  payload: tokens,
});

export const setLoading = (isLoading) => ({
  type: 'SET_LOADING',
  payload: isLoading,
});
