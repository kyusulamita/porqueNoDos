import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Dropdown, Card, Icon, Image, Button } from 'semantic-ui-react';

class UserRow extends Component{
  constructor(){
    super();
    this.state = {
      editBool: false,
    };
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  toggleEdit(){
    this.setState(({ editBool }) => { editBool: !editBool })
  }

  render(){
    const { employees, user, descriptionDetail } = this.props;
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
            <Button size="tiny" color="green" onClick={this.toggleEdit}>Editar</Button>
            {this.state.editBool && <div>Hello hi!</div>}
          </Card.Content>
        </Card>
      </div>
    )
  }
}


export default UserRow;
