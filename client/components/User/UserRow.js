import React from 'react';
import { connect } from 'react-redux';

import { Dropdown, Card, Icon, Image, Button } from 'semantic-ui-react';

const UserRow = ({employees, user}) => (
  <div key={user.id}>
    <Card>
      <Image src="https://placeimg.com/360/360/people" />
      <Card.Content>
        <Card.Header>{user.email}</Card.Header>
        <Card.Meta>{user.employee.firstName} {user.employee.lastName}</Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <Button size="tiny">Editar</Button>
      </Card.Content>
    </Card>
  </div>
)


export default UserRow;
