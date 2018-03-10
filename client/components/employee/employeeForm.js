import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';

const { Group, Select, Input } = Form;

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
    const employee = this.props.employee || {};
    return (
      <div>
        <Form>
          <Group>
            <Input label='First Name' placeholder={employee.firstName || 'First Name'} name='firstName'/>
            <Input label='Last Name' placeholder={employee.lastName || 'Last Name'} name='lastName'/ >
            <Input label='Address' placeholder={employee.address || 'Address'} name='address'/>
          </Group>
        </Form>
      </div>
    )
  }
}

const mapState = (state, ownProps) => {

}

const mapDispactch = (dispatch, ownProps) => {

}
export default EmployeeForm;
