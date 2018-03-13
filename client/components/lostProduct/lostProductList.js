import React, { Component } from 'react';
import { connect } from 'react-redux';


const lostProductList = (props) => {
   return <div>A list will be rendered here</div>
}


const mapState = ({lostProducts}, ownProps) => ({
  lostProducts,
});

const mapDispatch = (dispatch, ownProps) => ({

})


export default connect(mapState, mapDispatch)(lostProductList);
