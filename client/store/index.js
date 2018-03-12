import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import currentUser from './currentUser';
import employees from './employees';
import paystubs from './paystubs';

const reducer = combineReducers({ currentUser, employees, paystubs })
const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
const store = createStore(reducer, middleware)

export default store
export * from './currentUser'
export * from './employees'
export * from './paystubs'
