import React, { Component } from 'react';
import { getEmployee } from '../../store';
import { StubRow } from '../paystub/paystubRow'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Header, Image, List, Button, Comment } from 'semantic-ui-react';
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
      <div className='adminBox'>
        <div className='adminBoxForm'>
        {
          <Button basic size='small' color='teal' content={editBool ? 'Cancelar' : 'Editar Empleado'} onClick={() => this.setState(({editBool}) => ({ editBool:!editBool}))} />
        }
        {
          editBool && <EmployeeForm employee={this.props.employee} />
        }
        </div>
        <div className='adminBoxForm'>
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
    const { firstName, lastName, stubs, address, city, state, zipcode, phoneNumber, id } = employee;
    // stubs = stubs || [];
    const stubExtra = { firstName, lastName, employeeId: id }
    return (
      <div>
        <Header as='h2' textAlign='center'>
          <Image circular />
          {'  '}{firstName} {lastName}
          <Header.Subheader>
            {' '} Trabaja en el departamento
          </Header.Subheader>
        </Header>
        <div className ='Aligner'>
          <div className='Aligner-item--top' />
          <div className='Aligner-item'>
            <div>{address}</div>
            <div>{city}, {state} {zipcode}</div>
            <div>{phoneNumber}</div>
          </div>
          <div className='Aligner-item--bottom' />
        </div>
        {
          isAdmin && this.adminDisplay()
        }
        <Comment.Group>
          <Header as='h3' dividing> Paystubs </Header>
          {
            stubs && stubs.map(stub => <StubRow {...stub} {...stubExtra} />)
          }
        </Comment.Group>
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
