import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Header } from 'semantic-ui-react'
import { UserRow } from '../index'

class UserList extends Component {

  render(){
  const { users, employees, descriptionDetail } = this.props;
  const allUsers = users.map(user => <UserRow user={user} employees={employees} key={user.id} descriptionDetail={descriptionDetail} />)

    return (
      <div>
        <Header as="h2">Usarios</Header>
        {allUsers}
      </div>
    )

  }
}

const mapState = (state, ownProps) => {

  return ({
    users: state.users,
    employees: state.employees.map(employee => ({
      key: employee.id,
      value: employee.id,
      text: `${employee.firstName} ${employee.lastName}`,
    })),
    descriptionDetail: {
      ADMIN: 'Tiene acceso al sitio completo',
      WRITE: 'Puede registrar billes y perdidas',
      REGULAR: 'Solamente tiene acceso a propia informacion',
    },
  })
}

const mapDispatch = (dispatch, ownProps) => ({});


export default connect(mapState, mapDispatch)(UserList)
