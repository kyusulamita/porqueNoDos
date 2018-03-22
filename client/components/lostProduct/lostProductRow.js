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
    this.adminBox = this.adminBox.bind(this);
  }

  // if delete has been triggered clicking first button cancels it
  // if not clicking first button triggers edit
  onButtonClick(){
    if (!this.state.triggerDelete) {
      this.setState(({toggleEdit}) => ({ toggleEdit: !toggleEdit }))
    } else {
      this.setState({ triggerDelete: 0 });
    }
  }


  // increases triggerDelete by 1 each time, user must click it 4 times to delete
  onDelete(){
    if (this.state.triggerDelete === 3){
      this.props.delete(this.props.id);
    }
    this.setState(({triggerDelete}) => ({ triggerDelete: (++triggerDelete)}));
  }

  // if admin then update and delete buttons will be displayed
  adminBox(){
    const { toggleEdit } = this.state;
    const atWarning = this.state.triggerDelete;

    const [ editColor, editContent ] = (toggleEdit || atWarning) ? ['red', 'Cancelar'] : ['green', 'Cambiar'];
    const warnings = ['Borrar', 'Seguro?', 'Segurisimo?', 'Aviso Final'];
    const deleteText = warnings[atWarning];


    return ([
      <Cell>
        <Button
          onClick={this.onButtonClick}
          color={editColor}
          content={editContent}
          size='small'
        />
      </Cell>,
      <Cell>
        <Button
          onClick={this.onDelete}
          color='red'
          content={deleteText}
          size='small'
        />
      </Cell>
    ])
  }


  render(){
    const {total, date, product, amount, price, id, writePrivelege} = this.props;
    const {toggleEdit} = this.state;

    return (
      <Body>
        <Row key={id}>
          <Cell>{date}</Cell>
          <Cell>{product}</Cell>
          <Cell>{amount}</Cell>
          <Cell>${price}</Cell>
          <Cell>${total}</Cell>
           {
              writePrivelege ? this.adminBox() : [<Cell />,<Cell />]
           }
         </Row>
         {
          toggleEdit && <LostProductForm product={this.props} toggleView={this.onButtonClick}/>
         }
       </Body>
    )
  }
}

const mapState = (state, ownProps) => {
  const { adminLevel } = state.currentUser;
  return ({
    writePrivelege: adminLevel && (adminLevel === 'ADMIN' || adminLevel === 'WRITE');
  })
}
const mapDispatch = (dispatch, ownProps) => ({
  delete(id){
    dispatch(deleteProduct(id));
  }
})

export default connect(mapState, mapDispatch)(LostProductRow);
