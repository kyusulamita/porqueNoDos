import React, { Component } from 'react'
import { getVendor, deleteVendor } from '../../store';
import { connect } from 'react-redux';

import { Header, Image } from 'semantic-ui-react';

class vendorDetail extends Component{
  constructor(props){
    super(props);
    this.state = {
      editBool: false,
      addBool: false,
      triggerDelete: 0,
    }

  }

  componentDidMount(){
    this.props.fetchVendor();
  }

  render() {
    if (!this.props.currentVendor) return <div/>
    const { name, address, city, state, zipcode, phoneNumber } = this.props.currentVendor;
    console.log(this.props.currentVendor);
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
