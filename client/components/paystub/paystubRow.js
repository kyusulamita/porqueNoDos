import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const { Item, Content, Icon, Header, Description } = List;

export const StubRow = ({rate, hours, pay, id, paid}) => {
  // const {rate, hours} = props
  paid = 'some day'
  return (
    <Item key={id} as={Link} to={{pathname: `/stubs/${id}`}}>
      <Icon name='payment'/>
      <Content>
        <Header>paid {paid}</Header>
        <Description>Worked {hours} hours. Amount paid: ${pay}</Description>
      </Content>
    </Item>
  )
}

StubRow.propTypes = {
  hours: PropTypes.string,
  rate: PropTypes.string,
  pay: PropTypes.number,
}

export default StubRow;
