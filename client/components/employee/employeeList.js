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
  }

  render(){
    const {employees, isAdmin} = this.props;
    const { editBool } = this.state;
    return (
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
          <div className='Aligner'>
            <div className='Aligner-item--top' />

              {
                isAdmin && (<div className='Aligner-item'>
                              <Button basic color='teal' content={editBool ? 'Cancelar' : 'Crear Nuevo'} onClick={() => this.setState(({editBool}) => ({ editBool:!editBool}))} />
                            </div>)
              }
              {
                editBool && <div className='Aligner-item'><EmployeeForm /></div>
              }
            <div className='Aligner-item--bottom' />
          </div>
        </div>
        <div className='Aligner-item--bottom' />
      </div>
    )
  }
}

const mapState = ({currentUser, employees}) => ({
  isAdmin: currentUser && currentUser.isAdmin,
  employees
})

export default connect(mapState)(EmployeeList);


