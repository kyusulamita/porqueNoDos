import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { addPaystub, updatePaystub, getEmployee } from '../../store';
import { connect } from 'react-redux'
const { Group, Select, Input, Field } = Form;

class StubForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      rate: '',
      rateType: 'HOURLY',
      hours: '',
      start: '',
      end: '',
      employeeId: '',
    };
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event, {name, value}){
    console.log(name, value)
    this.setState({[name]: value});
  }

  handleOnSubmit(event) {
    event.preventDefault();
    const newForm = !this.props.stub;
    if (newForm){
      this.props.add(this.state);
    } else {
      const updatedInfo = {};
      for (const key in this.state){
        if (this.state[key]) updatedInfo[key] = this.state[key];
      }
      this.props.update(this.props.stub.id, updatedInfo);
    }
    this.setState({rate: '', rateType: 'HOURLY', hours: '', start: '', end: ''})
  }
  componentDidMount(){
    if (this.props.employeeId){
      this.setState({ employeeId: this.props.employeeId, rateType: this.props.stub.rateType || 'HOURLY'});
    }
  }
  render (){
    const stub = this.props.stub || {};
    const newForm = !this.props.stub;
    const { rate, rateType, hours, start, end, employeeId } = this.state;
    const rateOptions = [{ key: 'HOURLY', value: 'HOURLY', text: 'Por Hora'}, { key: 'WEEKLY', value: 'WEEKLY', text: 'Por Semana'}]
    return (
        <Form onSubmit={this.handleOnSubmit}>
          <Select placeholder='Escoge el empleado' options={this.props.employees} value={employeeId} name='employeeId' onChange={this.handleChange} disabled={!!this.props.employeeId}/>
          <Group widths='equal'>
            <Input label='Rate' placeholder={stub.rate || 'Rate'} name='rate' onChange={this.handleChange} required={newForm} value={rate}/>
            <Select label='Tipo' placeholder={stub.rateType || 'Escoge el tipo'} name='rateType' onChange={this.handleChange} required={newForm} value={rateType} options={rateOptions}/>
          </Group>
          <Group>
            {
              (this.state.rateType ==='HOURLY') &&
                <Input label='Horas' placeholder={stub.hours || 'Horas'} name='hours' onChange={this.handleChange} required value={hours}/>
            }
            <Input label='Comienzo' placeholder={stub.start || 'Comienzo'} name='start' onChange={this.handleChange} required={newForm} value={start} />
            <Input label='Final' placeholder={stub.end || 'Final'} name='end' onChange={this.handleChange} required={newForm} value={end} />
          </Group>
          <Button type='submit'>{newForm ? 'Crear' : 'Confirmar'}</Button>
        </Form>
    )
  }
}
const mapState = (state, ownProps) => ({
  employees: state.employees.map(employee => {
    const { id, firstName, lastName } = employee;
    return ({ key: id, value: id, text: `${firstName} ${lastName}`})
  })
})

const mapDispatch = (dispatch, ownProps) => ({
  add(newStub){
    const { employeeId } = newStub;
    dispatch(addPaystub(newStub));
    dispatch(getEmployee(employeeId));
  },
  update(id, stubInfo){
    const { employeeId } = stubInfo;
    dispatch(updatePaystub(id, stubInfo));
    dispatch(getEmployee(employeeId));
  }
})
export default connect(mapState, mapDispatch)(StubForm);
