import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Form } from 'semantic-ui-react';

class UserForm extends Component{
  constructor(){
    super();
    this.state = {

    }
  }

  render(){

  }
}

const mapState = (state, ownProps) => ({

});

const mapDispatch = (dispatch, ownProps) => ({
  editUser(){

  }
});

export default connect(mapState, mapDispatch)(UserForm);
