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
      <div className='Aligner'>
      <div className='Align-item--top' />
      <Table  celled collapsing basic='very' className='Align-item' padded unstackable >
        <Header>
          <Row>
            <HeaderCell/>
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

const mapState = ({lostProducts}) => ({
  lostProducts,
});

const mapDispatch = (dispatch) => ({

})


export default connect(mapState, mapDispatch)(lostProductList);
