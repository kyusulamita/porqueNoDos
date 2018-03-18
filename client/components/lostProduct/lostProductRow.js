import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import { LostProductForm } from '../index';
const { Row, Cell, Body } = Table;

class LostProductRow extends Component{
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
    const buttonColor = (toggleEdit) ? 'red' : 'green';
    const buttonContent = (toggleEdit) ? 'Cancelar' : 'Cambiar';
    return (
      <Body>
        <Row key={id}>
          <Cell>{date}</Cell>
          <Cell>{product}</Cell>
          <Cell>{amount}</Cell>
          <Cell>${price}</Cell>
          <Cell>${total}</Cell>
          <Cell>
            <Button
              onClick={this.onButtonClick}
              color={buttonColor}
              content={buttonContent}
              size='small'
            />
          </Cell>
         </Row>
         {
          toggleEdit && <LostProductForm product={this.props} toggleView={this.onButtonClick}/>
         }
       </Body>
    )
  }
}

export default LostProductRow;
