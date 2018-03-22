import React, { Component } from 'react'
import _ from 'lodash';
import { getVendor, deleteVendor } from '../../store';
import { connect } from 'react-redux';

import { Header, Image, Table } from 'semantic-ui-react';
import { BillRow } from '../index'
// const { Row, Header, HeaderCell} =
class vendorDetail extends Component{
  constructor(props){
    super(props);
    this.state = {
      editBool: false,
      addBool: false,
      triggerDelete: 0,
      bills: [],
      column: null,
      direction: null,
    }
    this.handleSort = this.handleSort.bind(this);
  }

  componentDidMount(){
    this.props.fetchVendor();
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.currentVendor && nextProps.currentVendor) {
      this.setState({ bills: nextProps.currentVendor.bills });
    }
    if (this.props.currentVendor && (this.props.currentVendor.id !== nextProps.currentVendor.id)) {
      this.setState({ bills: nextProps.currentUser.bills });
    }
  }

  handleSort(clickedColumn){
    const { column } = this.state;
    if (column !== clickedColumn) {
      this.setState(({ bills }) => ({
        bills: _.sortBy(bills, [clickedColumn]),
        column: clickedColumn,
        direction: 'ascending',
      }))
      return;
    }

    this.setState(({ bills, direction }) => ({
      bills: bills.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    }))
  }

  render() {
    if (!this.props.currentVendor) return <div/>
    const { name, address, city, state, zipcode, phoneNumber } = this.props.currentVendor;
    const { bills, column, direction } = this.state;

    return (
      <div>
        <Header as='h2' className='adminBox' textalign='center'>
          <Image circular src="https://placebear.com/200/200"/>
          {'  '}{name}
        </Header>
        <div >
            <div textalign='left'>{address}</div>
            <div textalign='left'>{city}, {state} {zipcode}</div>
            <div textalign='left'>{phoneNumber}</div>
        </div>
        <Table celled striped>
          <Table.Header >
            <Table.Row>
              <Table.HeaderCell
                sorted={column === 'date' ? direction : null}
                onClick={() => this.handleSort('date')}
                content='Fecha'
              />
              <Table.HeaderCell
                sorted={column === 'total' ? direction : null}
                onClick={() => this.handleSort('total')}
                content='Total'
              />
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>
          {
            bills.map((bill) => <BillRow {...bill} />)
          }
        </Table>
      </div>
    )
  }
}


const mapState = (state, ownProps) => {
  const { adminLevel } = state.currentUser;
  const isAuthorized = (adminLevel === 'ADMIN' || adminLevel === 'WRITE')
  const vendorId = +ownProps.match.params.vendorId;
  return ({
    isAuthorized,
    currentVendor: state.vendors.find(vendor => vendor.id === vendorId),
    isAdmin: adminLevel === 'ADMIN',
  });
}

const mapDispatch = (dispatch, ownProps) => {
  const vendorId = +ownProps.match.params.vendorId;
  return ({
    fetchVendor(){
      dispatch(getVendor(vendorId));
    },
    delete(){
      dispatch(deleteVendor(vendorId));
    }
  })
}


export default connect(mapState, mapDispatch)(vendorDetail);
