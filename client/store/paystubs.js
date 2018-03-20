import axios from 'axios';
import history from '../history';
import { REMOVE as REMOVE_EMPLOYEE } from './employees';
import { REMOVE_USER } from './currentUser';

/** ACTION TYPES **/
const GET_ALL = 'GET_PAYSTUBS';
const ADD = 'ADD_PAYSTUB';
const UPDATE = 'UPDATE_PAYSTUB';
const REMOVE= 'REMOVE_PAYSTUB';
const REMOVE_USER_PAYSTUBS = 'REMOVE_USER_PAYSTUBS'

/** INITIAL STATE **/
const defaultPaystubs = [];

/** ACTION CREATORS **/
const getAll = paystubs => ({type: GET_ALL, paystubs});
const add = paystub => ({type: ADD, paystub});
const update = paystub => ({type: UPDATE, paystub});
const remove = id => ({type: REMOVE, id});
export const removeUser = id => ({type: REMOVE_USER, id });
/** THUNK CREATORS **/
export const getPaystubs = () =>
  dispatch =>
    axios.get('/api/stubs')
      .then(res => res.data)
      .then(allPaystubs => dispatch(getAll(allPaystubs || defaultPaystubs)))
      .catch(err => console.log(err))

export const getPaystub = (paystubId) => {
  const asyncDispatch = async (dispatch) => {
      let singlePaystub = await axios.get(`/api/stubs/${paystubId}`);
      let YTD = await axios.get(`/api/stubs/${paystubId}/YTD`);
      singlePaystub = singlePaystub.data;
      singlePaystub.YTD = YTD.data;
      return dispatch(update(singlePaystub))
  }
  return asyncDispatch;
}

export const addPaystub = (paystub) =>
  dispatch =>
    axios.post('/api/stubs', paystub)
      .then(res => res.data)
      .then(newPaystub => dispatch(add(newPaystub)))
      .catch(err => console.log(`${err}. UNABLE TO ADD PAYSTUB ${paystub.employeeId}`))

export const updatePaystub = (id, paystub) => {
  const asyncDispatch = async (dispatch) => {
    let updatedStub = await axios.put(`/api/stubs/${id}`, paystub).catch(console.log);
    let YTD = await axios.get(`/api/stubs/${id}/YTD`).catch(console.log);
    updatedStub = updatedStub.data;
    updatedStub.YTD = YTD.data;
    return dispatch(update(updatedStub));
  }
  return asyncDispatch;
}
export const deletePaystub = (stubId, employeeId) =>
  dispatch =>
    axios.delete(`/api/stubs/${stubId}`)
    .then(() => dispatch(remove(stubId)))
    .then(() => history.push(`/empleados/${employeeId}`))
    .catch(err => console.log(`${err} UNABLE TO DELETE PAYSTUB ${stubId}`))


/** REDUCER**/
export default (paystubs = defaultPaystubs, action) => {
  switch (action.type){
    case GET_ALL:
      return action.paystubs;
    case ADD:
      return [...paystubs, action.paystub];
    case UPDATE: {
      let found = false;
      const newPaystubs = paystubs.map(paystub => {
        if (paystub.id !== action.paystub.id) return paystub;
        found = true;
        return action.paystub;
      });
      return found ? newPaystubs : [...newPaystubs, action.paystub];
    }
    case REMOVE:
      return paystubs.filter(paystub => paystub.id !== action.id);
    case REMOVE_EMPLOYEE:
      return paystubs.filter(paystub => paystub.employeeId !== action.id);
    case REMOVE_USER:
      return defaultPaystubs;
    default:
      return paystubs;
  }
}
