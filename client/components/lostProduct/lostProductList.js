import React, { Component } from 'react';
import { connect } from 'react-redux';

import { LostProductRow, LostProductForm } from '../index';
import { Table } from 'semantic-ui-react'
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
    return(
      <div className='Aligner'>
      <div className='Align-item--top' />
      <Table  celled collapsing basic='very' className='Align-item' padded unstackable >
        <Header>
          <Row>
            <HeaderCell textAlign='center'>Date</HeaderCell>
            <HeaderCell>Product</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Price</HeaderCell>
            <HeaderCell>Total</HeaderCell>
            <HeaderCell/>
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
      <div className='Align-item--bottom'/>
      </div>
    )
  }
}

const mapState = ({lostProducts}, ownProps) => ({
  lostProducts,
});

const mapDispatch = (dispatch, ownProps) => ({

})


export default connect(mapState, mapDispatch)(lostProductList);
