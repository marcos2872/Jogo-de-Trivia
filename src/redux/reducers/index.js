import { combineReducers } from 'redux';
import player from './player';
import token from './token';
import question from './questions';

const rootReducer = combineReducers({
  player,
  token,
  question,
});

export default rootReducer;
