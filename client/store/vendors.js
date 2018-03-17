import axios from 'axios';
import history from '../history';

const GET_ALL = 'GET_VENDORS';
const ADD = 'ADD_VENDOR';
const UPDATE = 'UPDATE_VENDOR';
const REMOVE = 'REMOVE_VENDOR';

const defaultVendors = [];

const getAll = vendors =>  ({ type: GET_ALL, vendors});
const add = vendor => ({type: ADD, vendor});
const update = vendor => ({type: UPDATE, vendor});
const remove = id => ({type: REMOVE, id });

export const getVendors = () =>
  dispatch =>
  axios.get(`/api/vendors`)
  .then(res => res.data)
  .then(allVendors => dispatch(getAll(allVendors || defaultVendors)))
  .catch(err => console.log(err))

export const getVendor = (vendorId) =>
  dispatch =>
  axios.get(`/api/vendors/${vendorId}`)
  .then(res => res.data)
  .then(singleVendor => dispatch(update(singleVendor)))
  .catch(err => console.log(err))

export const addVendor = (vendor) =>
  dispatch =>
  axios.post(`/api/vendors`, vendor)
  .then(res => res.data)
  .then(newVendor => dispatch(add(newVendor)))
  .catch(next)

export const updateVendor = (id, vendor) =>
  dispatch =>
  axios.put(`/api/vendors/${id}`, vendor)
  .then(res => res.data)
  .then(updatedVendor => dispatch(update(updatedVendor)))
  .catch(err => console.log(err))

export const deleteVendor = (id) =>
  dispatch =>
  axios.delete(`/api/vendors/${id}`)
  .then(() => dispatch(remove(id)))
  .catch(err => console.log(err))


export default (vendors = defaultVendors, action) => {
  switch (action.type){
    case GET_ALL:
      return action.vendors;
    case ADD:
      return [...vendors, action.vendor];
    case UPDATE:
      return vendors.map(vendor => vendor.id === action.vendor.id ? actions.vendor : vendor);
    case REMOVE:
      return vendors.filter(vendor => vendor.id !== action.id)
    default:
      return vendors;
  }
}
