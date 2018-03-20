import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Comment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

// const { Item, Content, Icon, Header, Description, Comment } = List;
const { Content, Avatar, Author, Metadata, Text, Actions, Action } = Comment;

export const StubRow = (props) => {
  const { hours, pay, id, payDate, rateType } = props;
  const { employeeId, firstName, lastName, personal } = props;
  const stubPay = (rateType === 'HOURLY') ? `${hours} horas` : `1 semana`;
  console.log(props)
  const linkTo = personal ? `/personal/${id}` : `/stubs/${id}`
  return (
    <Comment key={id}>
      <Avatar  src="https://placebear.com/200/200"/>
      <Content>
        <Author as={Link} to={`/empleados/${employeeId}`}>{`${firstName} ${lastName}`}</Author>
        <Metadata> Fecha: {payDate}</Metadata>
        <Text>Trabajo: {stubPay}. Pago: ${pay}</Text>
        <Actions>
          <Action as={Link} to={linkTo}>Ver stub in detalle</Action>
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
