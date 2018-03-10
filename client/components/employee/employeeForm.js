import React, { Component } from 'react';


class EmployeeForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      zipcode: '',
      phoneNumber: ''
    };
  }

  render (){
    return (
      <div>Form to come!! :)</div>
    )
  }
}

export default EmployeeForm;
