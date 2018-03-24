import React, { Component } from 'react';
import { connect } from 'react-redux';

import { UserRow } from '../index'

class UserList extends Component {

  render(){
  const { users, employees } = this.props;
  const allUsers = users.map(user => <UserRow user={user} employees={employees} key={user.id}/>)

    return(
      <div>
        {allUsers}
      </div>
    )

  }
}

const mapState = (state, ownProps) => ({
  users: state.users,
  employees: state.employees,
})

const mapDispatch = (dispatch, ownProps) => ({});


export default connect(mapState, mapDispatch)(UserList)
