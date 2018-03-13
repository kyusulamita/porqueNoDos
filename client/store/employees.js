import axios from 'axios';
import history from '../history';

/** ACTION TYPES **/
const GET_ALL = 'GET_EMPLOYEES';
const ADD = 'ADD_EMPLOYEE';
const UPDATE = 'UPDATE_EMPLOYEE';
const REMOVE= 'REMOVE_EMPLOYEE';

/** INITIAL STATE **/
const defaultEmployees = [];

/** ACTION CREATORS **/
const getAll = employees => ({type: GET_ALL, employees});
const add = employee => ({type: ADD, employee});
const update = employee => ({type: UPDATE, employee});
const remove = id => ({type: REMOVE, id});

/** THUNK CREATORS **/
export const getEmployees = () =>
  dispatch =>
    axios.get('/api/employees')
      .then(res => res.data)
      .then(allEmployees => dispatch(getAll(allEmployees || defaultEmployees)))
      .catch(err => console.err(err))

export const getEmployee = (employeeId) =>
  dispatch =>
    axios.get(`/api/employees/${employeeId}`)
      .then(res => res.data)
      .then(singleEmployee => dispatch(update(singleEmployee)))
      .catch(err => console.err(`${err}. UNABLE TO GET EMPLOYEE ${employeeId}`))

export const addEmployee = (employee) =>
  dispatch =>
    axios.post('/api/employees', employee)
      .then(res => res.data)
      .then(newEmployee => dispatch(add(newEmployee)))
      .catch(err => console.err(`${err}. UNABLE TO ADD EMPLOYEE ${employee.firstName}`))

export const updateEmployee = (id, employee) =>
  dispatch =>
    axios.put(`/api/employees/${id}`, employee)
      .then(res => res.data)
      .then(updatedEmployee => dispatch(update(updatedEmployee)))
      .catch(err => console.err(`${err} UNABLE TO UPDATE EMPLOYEE ${id}`))


export const deleteEmployee = (id) =>
  dispatch =>
    axios.delete(`/api/employees/${id}`)
    .then(() => dispatch(remove(id)))
    .catch(err => console.err(`${err} UNABLE TO DELETE EMPLOYEE ${id}`))


/** REDUCER**/
export default (employees = defaultEmployees, action) => {
  switch (action.type){
    case GET_ALL:
      return action.employees;
    case ADD:
      return [...employees, action.employee];
    case UPDATE:
      return employees.map(employee => (
        employee.id === action.employee.id ? action.employee : employee
      ));
    case REMOVE:
      return employees.filter(employee => employee.id !== action.id);
    default:
      return employees;
  }
}
