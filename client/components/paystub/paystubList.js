import React, { Component } from 'react';
import { connect } from 'react-redux';

import { PaystubRow } from '../index'
import { Comment, Header } from 'semantic-ui-react'

class PaystubList extends Component{
  constructor(props){
    super(props);
    this.state = {};
  }


  render(){
    const { paystubs } = this.props;
    return (
      <Comment.Group>
        <Header as='h2' dividing>All Paystubs</Header>
        {
          paystubs && paystubs.map(stub => <PaystubRow {...stub} firstName={stub.employee.firstName} lastName={stub.employee.lastName} key={stub.id}/>)
        }
      </Comment.Group>
    )
  }
}

const mapToState = ({paystubs}) => ({
  paystubs
})

export default connect(mapToState)(PaystubList);
