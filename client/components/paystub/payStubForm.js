import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { addEmployee, updateEmployee } from '../../store';
import { connect } from 'react-redux'
const { Group, Select, Input, Field } = Form;

class StubForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      rate: '',
      rateType: '',
      hours: '',
      start: '',
      end: '',
    };
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event, {name, value}){
    this.setState({[name]: value});
  }

  handleOnSubmit(event, secondThing){
    event.preventDefault();
    const newForm = !this.props.stub;
    if (newForm){
      this.props.add(this.state);;
    } else {
      const updatedInfo = {};
      for (const key in this.state){
        if (this.state[key]) updatedInfo[key] = this.state[key];
      }
      this.props.update(this.props.stub.id, updatedInfo);
    }
    this.setState({rate: '', rateType: '', hours: '', start: '', end: ''})
  }
  render (){
    const stub = this.props.stub || {};
    const newForm = !this.props.stub;
    const { rate, rateType, hours, start, end } = this.state;
    return (
        <Form onSubmit={this.handleOnSubmit}>
          <Group widths='equal'>
            <Input label='Rate' placeholder={stub.rate || 'Rate'} name='rate' onChange={this.handleChange} required={newForm} value={rate}/>
            <Input label='Rate type' placeholder={stub.lastName || 'Rate type'} name='rateType' onChange={this.handleChange} required={newForm} value={rateType} />
          </Group>
          <Group>
            <Input label='Horas' placeholder={stub.hours || 'Horas'} name='hours' onChange={this.handleChange} required={newForm} value={hours}/>
            <Input label='Comienzo' placeholder={stub.start || 'Comienzo'} name='start' onChange={this.handleChange} required={newForm} value={start} />
            <Input label='Final' placeholder={stub.end || 'Final'} name='state' onChange={this.handleChange} required={newForm} value={end} />
          </Group>
          <Button type='submit'>{newForm ? 'Crear' : 'Confirmar'}</Button>
        </Form>
    )
  }
}
const mapState = (state, ownProps) => ({
  employees: state.employees
})

const mapDispatch = (dispatch, ownProps) => ({
  add(newEmployee){
    dispatch(addEmployee(newEmployee))
  },
  update(id, employeeInfo){
    dispatch(updateEmployee(id, employeeInfo))
  }
})
export default connect(mapState, mapDispatch)(StubForm);
