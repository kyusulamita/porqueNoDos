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
  return arr.map((stub, index) => {
    if (index !== 0) stub.prev = arr[index - 1].id;
    if (index + 1 !== arr.length) stub.next = arr[index + 1].id;
    return stub;
  })
}

/** REDUCER**/
export default (employees = defaultEmployees, action) => {
  switch (action.type){
    case GET_ALL:
      return action.employees.map(employee => {
        employee.stubs = addPrevNext(employee.stubs);
        return employee;
      });
    case ADD:
      action.employee.stubs = addPrevNext(action.employee.stubs);
      return [...employees, action.employee];
    case UPDATE:
      action.employee.stubs = addPrevNext(action.employee.stubs);
      return employees.map(employee => (
         (employee.id !== action.employee.id) ? employee : action.employee));
    case REMOVE:
      return employees.filter(employee => employee.id !== action.id);
    default:
      return employees;
  }
}
