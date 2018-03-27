import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Dropdown, Card, Icon, Image, Button } from 'semantic-ui-react';

const UserRow = ({employees, user, descriptionDetail }) => {


  const { employee, adminLevel } = user;
  const fullName = (employee) ? `${employee.firstName} ${employee.lastName}` : ``;
  const description = descriptionDetail[adminLevel];

  return (
  <div key={user.id}>
    <Card>
      <Image src="https://placeimg.com/360/360/people" />
      <Card.Content>
        <Card.Header>{user.email}</Card.Header>
        <Card.Meta>{fullName}</Card.Meta>
        <Card.Description>{description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button size="tiny" color="green">Editar</Button>
      </Card.Content>
    </Card>
  </div>
  )
}


export default UserRow;
