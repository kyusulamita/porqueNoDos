import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import currentUser from './currentUser';
import employees from './employees';

const reducer = combineReducers({ currentUser, employees})
const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
const store = createStore(reducer, middleware)

export default store
export * from './currentUser'
export * from './employees'
