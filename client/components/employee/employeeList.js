import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Icon, Button, Card, Image } from 'semantic-ui-react'
import EmployeeForm from './employeeForm'
import EmployeeTile from './employeeTile'

class EmployeeList extends Component{
  super(props){
    constructor(props);
  }

  render(){
    const {employees, isAdmin} = this.props;
    return (
      <div>
        <Header as='h2' icon textAlign='center'>
          <Icon name='users' circular />
          <Header.Content>
            Empleados
          </Header.Content>
          Aqui estan sus hermosos empleados! Mira esas sonrisas :)
        </Header>
        <Card.Group>
        {
          employees.map(employee => <EmployeeTile key={employee.id} {...employee} />)
        }
        </Card.Group>
        {
          isAdmin && <EmployeeForm type='new'/>
        }
      </div>
    )
  }
}

const mapState = ({currentUser, employees}) => ({
  isAdmin: currentUser && currentUser.isAdmin,
  employees
})

export default connect(mapState)(EmployeeList);


