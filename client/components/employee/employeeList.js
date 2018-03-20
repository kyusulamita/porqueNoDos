import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Icon, Button, Card, Image } from 'semantic-ui-react'


import { EmployeeForm, EmployeeTile } from '../index'
class EmployeeList extends Component{
  constructor(props){
    super(props);
    this.state = {
      editBool: false,
    }
    this.toggleEdit = this.toggleEdit.bind(this);
    this.adminView = this.adminView.bind(this);
  }

  toggleEdit(){
    this.setState(({editBool}) => ({ editBool: !editBool}));
  }

  adminView(){
    const { editBool } = this.state;
    const [ color, content ] = editBool ? ['red', 'Cancelar'] : ['teal','Crear Nuevo'];
    return (
      <div className='Aligner'>
        <div className='Aligner-item--top' />
          <div className='Aligner-item'>
          {
            editBool && <EmployeeForm triggerView={this.toggleEdit} />
          }
            <Button
              color={color}
              content={content}
              onClick={this.toggleEdit}
            />
          </div>
        <div className='Aligner-item--bottom' />
      </div>
    )
  }
  render(){
    const { employees, isAdmin } = this.props;
    return (
      <div>
      <div className='Aligner'>
        <div className='Aligner-item--top' />
        <div className='Aligner-item-wide'>
          <Header as='h2' icon textAlign='center'>
            <Icon name='users' circular />
            <Header.Content>
              Empleados
            </Header.Content>
            Aqui estan sus hermosos empleados! Mira esas sonrisas :)
          </Header>
          <Card.Group centered >
          {
            employees.map(employee => <EmployeeTile key={employee.id} {...employee} />)
          }
          </Card.Group>
        </div>
        <div className='Aligner-item--bottom' />
      </div>
      {
        isAdmin && this.adminView()
      }
      </div>
    )
  }
}

const mapState = ({currentUser, employees}) => ({
  isAdmin: currentUser.adminLevel && currentUser.adminLevel === 'ADMIN',
  employees
})

export default connect(mapState)(EmployeeList);


