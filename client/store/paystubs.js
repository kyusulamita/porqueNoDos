import axios from 'axios';
import history from '../history';
import { REMOVE as REMOVE_EMPLOYEE } from './employees';
import { REMOVE_USER } from './currentUser';
import { sortByEmployeeAndDate, sortAndLink } from './utilFunc';
import _ from 'lodash';
// functo


/** ACTION TYPES **/
const GET_ALL = 'GET_PAYSTUBS';
const ADD = 'ADD_PAYSTUB';
const UPDATE = 'UPDATE_PAYSTUB';
const REMOVE= 'REMOVE_PAYSTUB';
const REMOVE_USER_PAYSTUBS = 'REMOVE_USER_PAYSTUBS'

/** INITIAL STATE **/
const defaultPaystubs = [];

/** ACTION CREATORS **/
const getAll = paystubs => {
  sortAndLink(paystubs, sortByEmployeeAndDate);
  return ({type: GET_ALL, paystubs})
};
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
      singlePaystub = singlePaystub.data;
      return dispatch(update(singlePaystub))
  }
  return asyncDispatch;
}

export const addPaystub = (paystub) =>
  dispatch =>
    axios.post('/api/stubs', paystub)
      .then(res => res.data)
      .then(newPaystub => {
        dispatch(add(newPaystub))
        return newPaystub.id;
      })
      .then(id => history.push(`/stubs/${id}`))
      .catch(err => console.log(`${err}. UNABLE TO ADD PAYSTUB ${paystub.employeeId}`))

export const updatePaystub = (id, paystub) => {
  const asyncDispatch = async (dispatch) => {
    let updatedStub = await axios.put(`/api/stubs/${id}`, paystub).catch(console.log);
    // let YTD = await axios.get(`/api/stubs/${id}/YTD`).catch(console.log);
    updatedStub = updatedStub.data;
    // updatedStub.YTD = YTD.data;
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
    case ADD:{
      const newPaystubs = _.cloneDeep([...paystubs, action.paystub]);
      return sortAndLink(newPaystubs, sortByEmployeeAndDate);
    }
    case UPDATE:
      return paystubs.map(paystub => ((paystub.id !== action.paystub.id) ? paystub : (Object.assign({}, paystub, action.paystub))));
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
