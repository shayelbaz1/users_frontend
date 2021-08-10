import { combineReducers } from 'redux';

import userReducer from './user';
// import todos from './todos'
// import visibilityFilter from './visibilityFilter'

export const reducers = combineReducers({
    userReducer,
    // todos,
    // visibilityFilter
});
