import React from 'react';
import { connect } from 'react-redux';

import { Dropdown } from 'semantic-ui-react';

const UserRow = ({employees, user}) => (
  <div key={user.id}>
    {user.email}  {user.adminLevel}
  </div>
)


export default UserRow;
