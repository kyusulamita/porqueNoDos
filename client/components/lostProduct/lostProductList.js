import React, { Component } from 'react';
import { connect } from 'react-redux';

import { LostProductRow, LostProductForm } from '../index';
import { Table, Button } from 'semantic-ui-react'
const { Header, Row, HeaderCell, Body, Footer, Cell } = Table;


class lostProductList extends Component {
  constructor(props){
    super(props);
    this.state = {
      addBool: false,
    }
    this.toggleAdd = this.toggleAdd.bind(this);
  }

  toggleAdd(){
    this.setState(({addBool}) => ({ addBool: !addBool}));
  }

  render(){
    const { addBool } = this.state;
    const { lostProducts } = this.props;
    const [ buttonColor, content ] = addBool ? ['red', 'Cancelar'] :['green', 'Nuevo'];
    return (
      <Table  celled padded unstackable >
        <Header>
          <Row>
            <HeaderCell textAlign='center'>Date</HeaderCell>
            <HeaderCell>Product</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Price</HeaderCell>
            <HeaderCell>Total</HeaderCell>
            <HeaderCell colSpan='2' textAlign='center'>
              <Button
                onClick={this.toggleAdd}
                color={buttonColor}
                content={content}
                size='small'
              />
            </HeaderCell>
          </Row>
          </Header>
        <Body>
          {
            addBool && <LostProductForm toggleView={this.toggleAdd}/>
          }
        </Body>
        {
          lostProducts.map((itemInfo) => <LostProductRow key={itemInfo.id} {...itemInfo} />)
        }
      </Table>
    )
  }
}

const mapState = ({lostProducts}) => ({
  lostProducts,
});

const mapDispatch = (dispatch) => ({

})


export default connect(mapState, mapDispatch)(lostProductList);
