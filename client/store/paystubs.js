import axios from 'axios';
import history from '../history';


/** ACTION TYPES **/
const GET_ALL = 'GET_PAYSTUBS';
const ADD = 'ADD_PAYSTUB';
const UPDATE = 'UPDATE_PAYSTUB';
const REMOVE= 'REMOVE_PAYSTUB';

/** INITIAL STATE **/
const defaultPaystubs = [];

/** ACTION CREATORS **/
const getAll = paystubs => ({type: GET_ALL, paystubs});
const add = paystub => ({type: ADD, paystub});
const update = paystub => ({type: UPDATE, paystub});
const remove = id => ({type: REMOVE, id});

/** THUNK CREATORS **/
export const getPaystubs = () =>
  dispatch =>
    axios.get('/api/stubs')
      .then(res => res.data)
      .then(allPaystubs => dispatch(getAll(allPaystubs || defaultPaystubs)))
      .catch(err => console.log(err))

export const getPaystub = (paystubId) => {
  return async (dispatch) => {
      let singlePaystub = await axios.get(`/api/stubs/${paystubId}`);
      let YTD = await axios.get(`/api/stubs/${paystubId}/YTD`);
      singlePaystub = singlePaystub.data;
      singlePaystub.YTD = YTD.data;
      return dispatch(update(singlePaystub))
  }
}

export const addPaystub = (paystub) =>
  dispatch =>
    axios.post('/api/stubs', paystub)
      .then(res => res.data)
      .then(newPaystub => dispatch(add(newPaystub)))
      .catch(err => console.log(`${err}. UNABLE TO ADD PAYSTUB ${paystub.employeeId}`))

export const updatePaystub = (id, paystub) =>
  async (dispatch) => {
    let updatedStub = await axios.put(`/api/stubs/${id}`, paystub).catch(console.log);
    let YTD = await axios.get(`/api/stubs/${id}/YTD`).catch(console.log);
    updatedStub = updatedStub.data;
    updatedStub.YTD = YTD.data;
    return dispatch(update(updatedStub));
}

export const deletePaystub = (id) =>
  dispatch =>
    axios.delete(`/api/stubs/${id}`)
    .then(() => dispatch(remove(id)))
    .catch(err => console.log(`${err} UNABLE TO DELETE PAYSTUB ${id}`))


/** REDUCER**/
export default (paystubs = defaultPaystubs, action) => {
  switch (action.type){
    case GET_ALL:
      return action.paystubs;
    case ADD:
      return [...paystubs, action.paystub];
    case UPDATE:
      return paystubs.map(paystub => (
        paystub.id === action.paystub.id ? action.paystub : paystub
      ));
    case REMOVE:
      return paystubs.filter(paystub => paystub.id !== action.paystub.id);
    default:
      return paystubs;
  }
}
