import React, { Component } from 'react';
import { getEmployee } from '../../store';
import { StubRow } from '../paystub/paystubRow'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Header, Image, List, Button } from 'semantic-ui-react';
import EmployeeForm from './employeeForm';
import StubForm from '../paystub/payStubForm';

class employeeDetail extends Component{
  constructor (props){
    super(props);
    this.state = {
      editBool: false,
      addBool: false,
    }
    this.adminDisplay = this.adminDisplay.bind(this);
  }
  componentDidMount(){
    this.props.fetchEmployee();
  }

  adminDisplay(){
    const { editBool, addBool } = this.state;
    return (
      <div>
        <div>
        {
          <Button basic size='small' color='teal' content={editBool ? 'Cancelar' : 'Editar Empleado'} onClick={() => this.setState(({editBool}) => ({ editBool:!editBool}))} />
        }
        {
          editBool && <EmployeeForm employee={this.props.employee} />
        }
        </div>
        <div>
        {
          <Button basic size='small' secondary color='teal' content={addBool ? 'Cancelar' : 'Anadir pago'} onClick={() => this.setState(({addBool}) => ({ addBool:! addBool}))} />
        }
        {
          addBool && <StubForm employeeId={this.props.employee.id}/>
        }
        </div>
      </div>
    )
  }

  render() {
    const { employee, isAdmin } = this.props;
    if (!employee) return <div />
    const { firstName, lastName, stubs } = employee;
    // stubs = stubs || [];
    return (
      <div>
        <Header as={'h2'}>
          <Image circular />
          {'  '}{firstName} {lastName}
          <Header.Subheader>
            {' '} Trabaja en el departamento
          </Header.Subheader>
        </Header>
        <div>
          <div>{employee.address}</div>
          <div>{employee.city}, {employee.state} {employee.zipcode}</div>
          <div>{employee.phoneNumber}</div>
        </div>
        <div>Past pay check stubs</div>
        <List>
        {
          stubs && stubs.map(stub => <StubRow key={stub.id} {...stub} />)
        }
        </List>
        {
          isAdmin && this.adminDisplay()
        }
      </div>
    )
  }
}

const mapState = (state, ownProps) => {
  const employeeId = +ownProps.match.params.employeeId;
  const { employees, currentUser } = state;
  const employee = employees.find(employ => employ.id === employeeId);
  return ({
    isAdmin: (currentUser && !!currentUser.isAdmin),
    currentUser,
    employee,
  })
}

const mapDispatch = (dispatch, ownProps) => ({
    fetchEmployee: () => {
      const employeeId = +ownProps.match.params.employeeId;
      dispatch(getEmployee(employeeId));
    },
});

export default connect(mapState, mapDispatch)(employeeDetail);


employeeDetail.propTypes = {
  employee: PropTypes.object,
  isAdmin: PropTypes.bool,
  currentUser: PropTypes.object,
}
