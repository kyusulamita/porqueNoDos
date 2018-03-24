import React from 'react';
import { connect } from 'react-redux';


const UserRow = ({employees, user}) => (
  <div key={user.id}>
    {user.email}  {user.employeeId}
  </div>
)


export default UserRow;
