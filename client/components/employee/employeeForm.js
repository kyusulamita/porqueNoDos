import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { addEmployee, updateEmployee } from '../../store';
import { connect } from 'react-redux'
const { Group, Input } = Form;

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

  handleOnSubmit(event){
    event.preventDefault();
    const newForm = !this.props.employee;
    if (newForm){
      this.props.add(this.state);
    } else {
      const updatedInfo = {};
      for (const key in this.state){
        if (this.state[key]) updatedInfo[key] = this.state[key];
      }
      this.props.update(this.props.employee.id, updatedInfo);
    }
    this.setState({ firstName: '', lastName: '', address: '', city: '', state: '', zipcode: '', phoneNumber: ''})
  }
  render (){
    const { firstName, lastName, address, city, state, zipcode, phoneNumber} = this.state;
    const { placeholder, newForm, buttonText } = this.props;
    return (
        <Form onSubmit={this.handleOnSubmit}>
          <Group widths='equal'>
            <Input
              label='Nombre'
              placeholder={placeholder.firstName}
              name='firstName'
              onChange={this.handleChange}
              required={newForm}
              value={firstName}
            />
            <Input
              label='Apellido'
              placeholder={placeholder.lastName}
              name='lastName'
              onChange={this.handleChange}
              required={newForm}
              value={lastName} />
          </Group>
          <Group>
            <Input
              label='Direccion'
              placeholder={placeholder.address}
              name='address'
              onChange={this.handleChange}
              required={newForm}
              value={address}
            />
            <Input
              label='Cuidad'
              placeholder={placeholder.city}
              name='city'
              onChange={this.handleChange}
              required={newForm}
              value={city}
            />
            <Input
              label='Estado'
              placeholder={placeholder.state}
              name='state'
              onChange={this.handleChange}
              required={newForm}
              value={state}
            />
          </Group>
          <Group>
            <Input
              label='Codigo Postal'
              placeholder={placeholder.zipcode}
              name='zipcode'
              onChange={this.handleChange}
              required={newForm}
              value={zipcode}
            />
            <Input
              label='Numero De Telefono'
              placeholder={placeholder.phoneNumber}
              name='phoneNumber'
              onChange={this.handleChange}
              required={newForm}
              value={phoneNumber}
            />
          </Group>
          <Button
            color='green'
            type='submit'
            content={buttonText}
          />
        </Form>
    )
  }
}
const mapState = (state, ownProps) => {
  const placeholder = {
      firstName: 'Nombre',
      lastName: 'Apellido',
      address: 'Direccion',
      city: 'Cuidad',
      state: 'Estado',
      zipcode: 'Codigo Postal',
      phoneNumber: '(XXX) XXX-XXXX',
    };
  return ({
    newForm: !ownProps.employee,
    buttonText: !ownProps.employee ? 'Crear' : 'Confirmar',
    placeholder: ownProps.employee || placeholder,
  });
}

const mapDispatch = (dispatch) => ({
  add(newEmployee){
    dispatch(addEmployee(newEmployee))
  },
  update(id, employeeInfo){
    dispatch(updateEmployee(id, employeeInfo))
  }
})
export default connect(mapState, mapDispatch)(EmployeeForm);
