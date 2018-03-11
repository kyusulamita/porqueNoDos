import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Icon, Button, Card, Image } from 'semantic-ui-react'
import EmployeeForm from './employeeForm'
import EmployeeTile from './employeeTile'

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
          isAdmin && <Button basic color='teal' content={editBool ? 'Cancelar' : 'Crear Nuevo'} onClick={() => this.setState(({editBool}) => ({ editBool:!editBool}))} />
        }
        {
          editBool && <EmployeeForm />
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


