import React, { Component } from 'react';
import { connect } from 'react-redux';

import { LostProductRow } from '../index';
import { Table } from 'semantic-ui-react'
const { Header, Row, HeaderCell, Body, Footer, Cell } = Table;


const lostProductList = (props) => {
  const { lostProducts } = props;
  return(
    <Table  celled striped>
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
      {
        lostProducts.map((itemInfo) => <LostProductRow key={itemInfo.id} {...itemInfo} />)
      }
    </Table>
  )
}


const mapState = ({lostProducts}, ownProps) => ({
  lostProducts,
});

const mapDispatch = (dispatch, ownProps) => ({

})


export default connect(mapState, mapDispatch)(lostProductList);
