import axios from 'axios';
import history from '../history';
import { REMOVE_USER } from './currentUser'
/** ACTION TYPES **/

const GET_ALL = 'GET_EMPLOYEES';
const ADD = 'ADD_EMPLOYEE';
const UPDATE = 'UPDATE_EMPLOYEE';
export const REMOVE = 'REMOVE_EMPLOYEE';

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
      .catch(err => console.log(err))

export const getEmployee = (employeeId) =>
  dispatch =>
    axios.get(`/api/employees/${employeeId}`)
      .then(res => res.data)
      .then(singleEmployee => dispatch(update(singleEmployee)))
      .catch(err => console.log(`${err}. UNABLE TO GET EMPLOYEE ${employeeId}`))

export const addEmployee = (employee) =>
  dispatch =>
    axios.post('/api/employees', employee)
      .then(res => res.data)
      .then(newEmployee => dispatch(add(newEmployee)))
      .catch(err => console.log(`${err}. UNABLE TO ADD EMPLOYEE ${employee.firstName}`))

export const updateEmployee = (id, employee) =>
  dispatch =>
    axios.put(`/api/employees/${id}`, employee)
      .then(res => res.data)
      .then(updatedEmployee => dispatch(update(updatedEmployee)))
      .catch(err => console.log(`${err} UNABLE TO UPDATE EMPLOYEE ${id}`))


export const deleteEmployee = (id) =>
  dispatch =>
    axios.delete(`/api/employees/${id}`)
    .then(() => dispatch(remove(id)))
    .then(() => history.push(`/empleados`))
    .catch(err => console.log(`${err} UNABLE TO DELETE EMPLOYEE ${id}`))

function addPrevNext(arr){
    arr.sort((a, b) => new Date(b.start) - new Date(a.start))
    arr.map((stub, index) => {
      if (index !== 0) stub.next = arr[index - 1].id;
      if (index + 1 !== arr.length) stub.prev = arr[index + 1].id;
    })
}

/** REDUCER**/
export default (employees = defaultEmployees, action) => {
  switch (action.type){
    case GET_ALL:
      return action.employees.map(employee => {
        addPrevNext(employee.stubs);
        return employee;
      });
    case ADD:
      addPrevNext(action.employee.stubs);
      return [...employees, action.employee];
    case UPDATE: {
      addPrevNext(action.employee.stubs);
      let found = false;
      const newEmployees = employees.map(employee => {
         if (employee.id !== action.employee.id) return employee;
         found = true;
         return action.employee;
      });
      return found ? newEmployees : [...newEmployees, action.employee];
    }
    case REMOVE:
      return employees.filter(employee => employee.id !== action.id);
    case REMOVE_USER:
      return defaultEmployees;
    default:
      return employees;
  }
}
