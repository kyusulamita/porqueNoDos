import axios from 'axios';

import { REMOVE_USER } from './currentUser';

const GET = 'GET_USERS';
const UPDATE = 'UPDATE_USER';
const REMOVE = 'REMOVE_USER';

const defaultUsers = [];


const getAll = users => ({ type: GET, users });
const update = user => ({ type: UPDATE, user });
const remove = id => ({type: REMOVE, id });

export const getUsers = () =>
  dispatch =>
    axios.get(`/api/users`)
    .then(res => res.data)
    .then(allUsers => dispatch(getAll(allUsers || defaultUsers)))
    .catch(err => console.log(err));


export const updateUser = (id, user) =>
  dispatch =>
    axios.put(`/api/users/${id}`, user)
    .then(res => res.data)
    .then(updatedUser => dispatch(update(updatedUser)))
    .catch(err => console.log(err))

export const deleteUser = (id) =>
  dispatch =>
    axios.delete(`/api/users/${id}`)
    .then(() => dispatch(remove(id)))
    .catch(err => console.log(err))

export default(users = defaultUsers, action) => {
  switch (action.type){
    case GET:
      return action.users;
    case UPDATE:
      return users.map(user => user.id === action.user.id ? action.user : user);
    case REMOVE:
      return users.filter(user => user.id === action.id);
    case REMOVE_USER:
      return defaultUsers;
    default:
      return users;
  }
}
