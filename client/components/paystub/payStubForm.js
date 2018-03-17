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
      married: false,
      payDate: ''
    };
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event, {name, value}){
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
    const {employeeId, stub } = this.props;
    this.setState((prevState) => {
      const newState = prevState;
      if (employeeId) newState.employeeId = employeeId;
      if (stub) newState.married = stub.married || false;
      return newState;
    });
  }
  render (){
    const { rate, rateType, hours, start, end, employeeId, married, payDate } = this.state;
    const { handleChange, handleOnSubmit } = this;
    const { employees, placeholder, newForm, rateOptions, marriedOptions, buttonText } = this.props;
    return (
        <Form onSubmit={handleOnSubmit}>
          <Select
            label='Empleado'
            placeholder='Escoge el empleado'
            options={employees}
            value={employeeId}
            name='employeeId'
            onChange={handleChange}
            disabled={newForm}
          />
          <Group widths='equal'>
            <Input
              label='Rate'
              placeholder={placeholder.rate}
              name='rate'
              onChange={handleChange}
              required={newForm}
              value={rate}
            />
            <Select
              label='Tipo'
              placeholder={placeholder.rateType}
              name='rateType'
              onChange={handleChange}
              required={newForm}
              value={rateType}
              options={rateOptions}
            />
            <Select
              label='Casado?'
              placeholder={placeholder.married ? 'Si' : 'No'}
              name='married'
              onChange={handleChange}
              required={newForm}
              value={married}
              options={marriedOptions}
            />
          </Group>
          <Group>
            {
              (rateType ==='HOURLY') &&
                <Input
                  label='Horas'
                  placeholder={placeholder.hours}
                  name='hours'
                  onChange={handleChange}
                  required
                  value={hours}
                />
            }
            <Input
              label='Comienzo'
              placeholder={placeholder.start}
              name='start'
              onChange={handleChange}
              required={newForm}
              value={start}
            />
            <Input
              label='Final'
              placeholder={placeholder.end}
              name='end'
              onChange={handleChange}
              required={newForm}
              value={end}
            />
            <Input
              label='Pagado'
              placeholder={placeholder.payDate}
              name='payDate'
              onChange={handleChange}
              required={newForm}
              value={payDate}
            />
          </Group>
          <Button color='green' type='submit' content={buttonText}/>
        </Form>
    )
  }
}
const mapState = (state, ownProps) => {
  const placeholder = { rate: 'Rate', rateType: 'Escoge el Tipo', married: false, hours: 'Horas', start:'MM/DD/AAAA', end: 'MM/DD/AAAA', payDate: 'MM/DD/AAAA'};
  const employees = state.employees.map(employee => {
    const { id, firstName, lastName } = employee;
    return ({ key: id, value: id, text: `${firstName} ${lastName}`});
  });
  return ({
    employees: employees,
    placeholder: ownProps.stub || placeholder,
    newForm: !ownProps.stub,
    rateOptions: [{ key: 'HOURLY', value: 'HOURLY', text: 'Por Hora'}, { key: 'WEEKLY', value: 'WEEKLY', text: 'Por Semana'}],
    marriedOptions: [{key: 'si', value: true, text:'si'}, {key:'no', value: false, text:'no'}],
    buttonText: !ownProps.stub ? 'Crear' : 'Cambiar',
  })
}

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
