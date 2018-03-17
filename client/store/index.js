import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import currentUser from './currentUser';
import employees from './employees';
import paystubs from './paystubs';
import lostProducts from './lostProducts';
import vendors from './vendors';

const reducer = combineReducers({ currentUser, vendors, employees, paystubs, lostProducts })
const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
const store = createStore(reducer, middleware)

export default store
export * from './currentUser'
export * from './employees'
export * from './paystubs'
export * from './lostProducts'
export * from './vendors'
