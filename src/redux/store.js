import { createStore, combineReducers } from 'redux';
import passwordResetReducer from './reducers/passwordResetReducer';

const rootReducer = combineReducers({
  passwordReset: passwordResetReducer,
});

const store = createStore(rootReducer);

export default store;
