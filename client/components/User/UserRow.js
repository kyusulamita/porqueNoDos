import React from 'react';
import { connect } from 'react-redux';

import { Dropdown, Card, Icon, Image } from 'semantic-ui-react';

const UserRow = ({employees, user}) => (
  <div key={user.id}>
    <Card>
      <Card.Content>
        <Card.Header>{user.email}</Card.Header>
      </Card.Content>
    </Card>
  </div>
)


export default UserRow;
