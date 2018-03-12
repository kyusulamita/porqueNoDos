import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Comment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

// const { Item, Content, Icon, Header, Description, Comment } = List;
const { Content, Avatar, Author, Metadata, Text, Actions, Action } = Comment;

export const StubRow = (props) => {
  // const {rate, hours} = props
  console.log(props);
  let {rate, hours, pay, id, paid } = props;
  const { employeeId, firstName, lastName } = props;
  if (!paid) paid = 'some day'
  return (
    <Comment key={id}>
      <Avatar  />
      <Content>
        <Author as={Link} to={`/empleadoes/${employeeId}`}>{`${firstName} ${lastName}`}</Author>
        <Metadata> Ver mas detalles sobre empleado</Metadata>
        <Text>Worked {hours} hours. Amount paid: ${pay}</Text>
        <Actions>
          <Action as={Link} to={`/stubs/${id}`}>Ver stub in detalle</Action>
        </Actions>
      </Content>
    </Comment>
  )
}

StubRow.propTypes = {
  hours: PropTypes.string,
  rate: PropTypes.string,
  pay: PropTypes.number,
}

export default StubRow;
