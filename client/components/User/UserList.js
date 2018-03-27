import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Header } from 'semantic-ui-react'
import { UserRow } from '../index'

class UserList extends Component {

  render(){
  const { users, employees } = this.props;
  const allUsers = users.map(user => <UserRow user={user} employees={employees} key={user.id}/>)

    return(
      <div>
        <Header as='h2'>Usarios</Header>
        {allUsers}
      </div>
    )

  }
}

const mapState = (state, ownProps) => ({
  users: state.users,
  employees: state.employees.map(employee => ({
    key: employee.id,
    value: employee.id,
    text: `${employee.firstName} ${employee.lastName}`,
  })),
})

const mapDispatch = (dispatch, ownProps) => ({});


export default connect(mapState, mapDispatch)(UserList)
