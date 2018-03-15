import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';

import LostProductForm from './LostProductForm';
const { Row, Cell, Body } = Table;

class lostProductRow extends Component{
  constructor(props){
    super(props);
    this.state = {
      toggleEdit: false
    }
    this.onButtonClick = this.onButtonClick.bind(this);
  }
  onButtonClick(event){
     this.setState(({toggleEdit}) => ({ toggleEdit: !toggleEdit}))
  }

  render(){
    const {total, date, product, amount, price, id} = this.props;
    const {toggleEdit} = this.state;
    return (
      <Body>
        <Row key={id}>
          <Cell>{date}</Cell>
          <Cell>{product}</Cell>
          <Cell>{amount}</Cell>
          <Cell>$ {price}</Cell>
          <Cell>$ {total}</Cell>
          <Cell><Button onClick={this.onButtonClick}>Edit</Button></Cell>
         </Row>
         {
          toggleEdit && <LostProductForm {...this.props} />
         }
       </Body>
    )
  }
}

export default lostProductRow;
