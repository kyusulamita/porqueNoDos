import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Comment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

// const { Item, Content, Icon, Header, Description, Comment } = List;
const { Content, Avatar, Author, Metadata, Text, Actions, Action } = Comment;

export const StubRow = (props) => {
  const { rate, hours, pay, id, paid, payDate } = props;
  const { employeeId, firstName, lastName } = props;  return (
    <Comment key={id}>
      <Avatar  />
      <Content>
        <Author as={Link} to={`/empleados/${employeeId}`}>{`${firstName} ${lastName}`}</Author>
        <Metadata> Pagado {payDate}</Metadata>
        <Text>Trabajado: {hours ? `${hours} horas` : `1 semana`}. Pagado: ${pay}</Text>
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
  gross: PropTypes.string,
}

export default StubRow;
