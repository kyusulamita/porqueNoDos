import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Table, Button } from 'semantic-ui-react';
import { LostProductForm } from '../index';
import { deleteProduct } from '../../store'
const { Row, Cell, Body } = Table;

class LostProductRow extends Component{
  constructor(props){
    super(props);
    this.state = {
      toggleEdit: false,
      triggerDelete: 0,
    }
    this.onButtonClick = this.onButtonClick.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }
  onButtonClick(){
    const { triggerDelete } = this.state;
    if (!triggerDelete) {
      this.setState(({toggleEdit}) => ({ toggleEdit: !toggleEdit }))
    } else {
      this.setState({ triggerDelete: 0 });
    }
  }
  onDelete(){
    if (this.state.triggerDelete === 3){
      this.props.delete(this.props.id);
    }
    this.setState(({triggerDelete}) => ({ triggerDelete: (++triggerDelete%4)}));
  }
  render(){
    const {total, date, product, amount, price, id} = this.props;
    const {toggleEdit} = this.state;
    const atWarning = this.state.triggerDelete;
    const [ editColor, editContent ] = (toggleEdit || atWarning) ? ['red', 'Cancelar'] : ['green', 'Cambiar'];
    const warnings = ['Borrar', 'Seguro?', 'Segurisimo?', 'Aviso Final'];
    const deleteText = warnings[atWarning];

    return (
      <Body>
        <Row key={id}>
          <Cell/>
          <Cell>{date}</Cell>
          <Cell>{product}</Cell>
          <Cell>{amount}</Cell>
          <Cell>${price}</Cell>
          <Cell>${total}</Cell>
          <Cell>
            <Button
              onClick={this.onButtonClick}
              color={editColor}
              content={editContent}
              size='small'
            />
          </Cell>
          <Cell>
            <Button
              onClick={this.onDelete}
              color='red'
              content={deleteText}
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

const mapState = (state, ownProps) => ({})
const mapDispatch = (dispatch, ownProps) => ({
  delete(id){
    dispatch(deleteProduct(id));
  }
})

export default connect(mapState, mapDispatch)(LostProductRow);
