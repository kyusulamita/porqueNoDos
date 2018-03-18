import axios from 'axios';
import history from '../history';

const GET_ALL = 'GET_PRODUCTS';
const ADD = 'ADD_PRODUCT'
const UPDATE = 'UPDATE_PRODUCT';
const REMOVE = 'REMOVE_PRODUCT';

const defaultProducts = [];

const getAll = products => ({type: GET_ALL, products});
const add = product => ({type: ADD, product});
const update = product => ({type: UPDATE, product});
const remove = id => ({type: REMOVE, id});

export const getProducts = () =>
  dispatch =>
    axios.get(`/api/lostproducts`)
      .then(res => res.data)
      .then(allProducts => dispatch(getAll(allProducts || defaultProducts)))
      .catch(err => console.log(err))

export const getProduct = (productId) =>
  dispatch =>
    axios.get(`/api/lostproducts/${productId}`)
      .then(res => res.data)
      .then(singleProduct => dispatch(update(singleProduct)))
      .catch(err => console.log(err))

export const addProduct = (product) =>
  dispatch =>
    axios.post(`/api/lostproducts`, product)
      .then(res => res.data)
      .then(newProduct => dispatch(add(newProduct)))
      .catch(err => console.log(err))

export const updateProduct = (id, product) =>
  dispatch =>
    axios.put(`/api/lostproducts/${id}`, product)
      .then(res => res.data)
      .then(updatedProduct => dispatch(update(updatedProduct)))
      .catch(err => console.log(err))

export const deleteProduct = (id) =>
  dispatch =>
    axios.delete(`/api/lostproducts/${id}`)
      .then(() => dispatch(remove(id)))
      .catch(err => console.log(err))

export default (lostproducts = defaultProducts, action) => {
  switch (action.type){
    case GET_ALL:
      return action.products;
    case ADD:
      return [...lostproducts, action.product];
    case UPDATE:
      return lostproducts.map(product => (product.id === action.product.id ? action.product : product));
    case REMOVE:
      return lostproducts.filter(product => product.id !== action.id);
    default:
      return lostproducts;
  }
}
