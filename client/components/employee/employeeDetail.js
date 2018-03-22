import React, { Component } from 'react';
import { getEmployee, deleteEmployee } from '../../store';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Header, Image, List, Button, Comment } from 'semantic-ui-react';

import { EmployeeForm, PaystubForm, PaystubRow } from '../index'

class employeeDetail extends Component{
  constructor (props){
    super(props);
    this.state = {
      editBool: false,
      addBool: false,
      triggerDelete: 0,
    }
    this.adminDisplay = this.adminDisplay.bind(this);
    this.toggleAdd = this.toggleAdd.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }
  componentDidMount(){
    this.props.fetchEmployee();
  }

  toggleAdd(){
    this.setState(({addBool}) => ({ addBool: !addBool }));
  }

  toggleEdit(){
    if (this.state.triggerDelete){
      this.setState({triggerDelete: 0});
    } else {
      this.setState(({editBool}) => ({ editBool: !editBool }));
    }
  }
  onDelete(){
    if (this.state.triggerDelete === 3){
      this.props.delete();
    }
    this.setState(({triggerDelete}) => ({ triggerDelete: (++triggerDelete)}));
  }
  adminDisplay(){
    const { editBool, addBool } = this.state;
    const { toggleEdit, toggleAdd, onDelete } = this;
    const addText = addBool ? 'Cancelar' : 'Anadir pago';
    const atWarning = this.state.triggerDelete;
    const editText = (editBool || atWarning) ? 'Cancelar' : 'Editar Empleado';
    const warnings = ['Borrar', 'Seguro?', 'Segurisimo?', 'Aviso Final'];
    const deleteText = warnings[atWarning];
    return (
      <div >
        <div className='adminBoxForm'>
        <Button
          size='small'
          negative
          content={deleteText}
          onClick={onDelete}
        />
        <Button
          size='small'
          color='teal'
          negative={editBool || !!atWarning }
          content={editText}
          onClick={toggleEdit}
        />
        {
          editBool && <EmployeeForm employee={this.props.employee} triggerView={toggleEdit}/>
        }
        </div>
        <div className='adminBoxForm'>
        <Button
          size='small'
          secondary={!addBool}
          color='teal'
          negative={addBool}
          content={addText}
          onClick={toggleAdd}
        />
        {
          addBool && <PaystubForm employeeId={this.props.employee.id} triggerView={toggleAdd}/>
        }
        </div>
      </div>
    )
  }

  render() {
    const { employee, isAdmin, isAuthorized } = this.props;
    // console.log(this.props);
    if (!employee) return <div />
    if (!isAuthorized) return <div>You don't have the right! </div>
    const { firstName, lastName, stubs, address, city, state, zipcode, phoneNumber, id } = employee;
    const stubExtra = { firstName, lastName, employeeId: id }
    return (
      <div>
        <Header as='h2' className='adminBox' textalign='center'>
          <Image circular src="https://placebear.com/200/200"/>
          {'  '}{firstName} {lastName}
          <Header.Subheader>
            {' '} Trabaja en el departamento
          </Header.Subheader>
        </Header>
        <div >
            <div textalign='left'>{address}</div>
            <div textalign='left'>{city}, {state} {zipcode}</div>
            <div textalign='left'>{phoneNumber}</div>
        </div>
        {
          isAdmin && this.adminDisplay()
        }
        <Comment.Group>
          <Header as='h3' dividing> Paystubs </Header>
          {
            stubs && stubs.map(stub => <PaystubRow key={stub.id} {...stub} {...stubExtra} />)
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
  const isAdmin = (currentUser.adminLevel && currentUser.adminLevel === 'ADMIN');
  const isAuthorized = isAdmin || (employeeId  === currentUser.employeeId);
  return ({
    isAuthorized,
    isAdmin,
    currentUser,
    employee,
  })
}

const mapDispatch = (dispatch, ownProps) => {
  const employeeId = +ownProps.match.params.employeeId;
  return ({
    fetchEmployee(){
      dispatch(getEmployee(employeeId));
    },
    delete(){
      dispatch(deleteEmployee(employeeId));
    }
  })
};

export default connect(mapState, mapDispatch)(employeeDetail);


employeeDetail.propTypes = {
  employee: PropTypes.object,
  isAdmin: PropTypes.bool,
  currentUser: PropTypes.object,
}
