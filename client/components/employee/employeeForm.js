import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { addEmployee, updateEmployee } from '../../store';
import { connect } from 'react-redux'
const { Group, Select, Input, Field } = Form;

class EmployeeForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      zipcode: '',
      phoneNumber: '',
    };
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event, {name, value}){
    this.setState({[name]: value});
  }

  handleOnSubmit(event, secondThing){
    event.preventDefault();
    console.log('made it here!')
    const newForm = !this.props.employee;
    if (newForm){
      this.props.add(this.state);;
    } else {
      const updatedInfo = {};
      for (const key in this.state){
        if (this.state[key]) updatedInfo[key] = this.state[key];
      }
      console.log(updatedInfo)
      this.props.update(this.props.employee.id, updatedInfo);
    }
    this.setState({ firstName: '', lastName: '', address: '', city: '', state: '', zipcode: '', phoneNumber: ''})
  }
  render (){
    const employee = this.props.employee || {};
    const newForm = !this.props.employee;
    const {firstName, lastName, address, city, state, zipcode, phoneNumber} = this.state;
    return (
        <Form onSubmit={this.handleOnSubmit}>
          <Group widths='equal'>
            <Input label='Nombre' placeholder={employee.firstName || 'Nombre'} name='firstName'onChange={this.handleChange} required={newForm} value={firstName}/>
            <Input label='Apellido' placeholder={employee.lastName || 'Apellido'} name='lastName' onChange={this.handleChange} required={newForm} value={lastName} />
          </Group>
          <Group>
            <Input label='Direccion' placeholder={employee.address || 'Direccion'} name='address' onChange={this.handleChange} required={newForm} value={address}/>
            <Input label='Cuidad' placeholder={employee.city || 'Cuidad'} name='city' onChange={this.handleChange} required={newForm} value={city} />
            <Input label='Estado' placeholder={employee.state || 'Estado'} name='state' onChange={this.handleChange} required={newForm} value={state} />
          </Group>
          <Group>
            <Input label='Codigo Postal' placeholder={employee.zipcode || 'Codigo Postal'} name='zipcode' onChange={this.handleChange} required={newForm} value={zipcode} />
            <Input label='Numero De Telefono' placeholder={employee.phoneNumber || '(999)999-9999'} name='phoneNumber' onChange={this.handleChange} required={newForm} value={phoneNumber} />
          </Group>
          <Button type='submit'>{newForm ? 'Crear' : 'Confirmar'}</Button>
        </Form>
    )
  }
}
const mapState = (state, ownProps) => ({

})

const mapDispatch = (dispatch, ownProps) => ({
  add(newEmployee){
    dispatch(addEmployee(newEmployee))
  },
  update(id, employeeInfo){
    dispatch(updateEmployee(id, employeeInfo))
  }
})
export default connect(mapState, mapDispatch)(EmployeeForm);
