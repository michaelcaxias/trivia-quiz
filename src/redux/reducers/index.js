import { combineReducers } from 'redux';
import userReducer from './userReducer';
import triviaReducer from './triviaReducer';

const rootReducer = combineReducers({ userReducer, triviaReducer });

export default rootReducer;
