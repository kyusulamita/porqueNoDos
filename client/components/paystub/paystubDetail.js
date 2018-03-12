import React, { Component } from 'react';
import { getPaystub } from '../../store';
import { connect } from 'react-redux';

import StubForm from '../paystub/paystubForm';

class PaystubDetail extends Component{
  constructor(props){
    super(props);
  }

  ComponentDidMount(){
    this.props.getStub();
  }

  render(){
    console.log(this.props.currentStub)
    return(
      <div />
    )
  }
}

const mapState = (state, ownProps) => {
  const stubId = +ownProps.match.params.stubId;
  return ({
    currentStub: state.paystubs.find(stub => stub.id === stubId)
  })
}

const mapDispatch = (dispatch, ownProps) => ({
    getStub(){
      const stubId = +ownProps.match.params.stubId;
      dispatch(getPaystub(stubId));
    }
})

export default connect(mapState, mapDispatch)(PaystubDetail)
