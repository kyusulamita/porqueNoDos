import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Form, Dropdown } from 'semantic-ui-react';

class UserForm extends Component{
  constructor(){
    super();
    this.state = {
      adminLevel : '',
      employeeId: '',
    }
    this.onChange = this.onChange.bind(this);
    this.submitChange = this.submitChange.bind(this);
  }

  onChange(event){
    const { target, value } = event;
    this.setState({ [target]: value })
  }

  submitChange(event){
    
  }

  render(){

  const { onChange, submitChange } = this;
  const { employees, levels } = this.props;

  return(
    <div>
      <Dropdown 
        name='employeedId' 
        fluid 
        selection 
        options={employees} 
        onChange={onChange}
      />
      <Dropdown 
        name='adminLevel' 
        fluid 
        selection 
        options={levels}
        onChange={onChange} 
      />
      <Button
        content='Editar'
        onClick={submitChange}
      />
    </div>
    )
  }
}

const mapState = (state, ownProps) => ({
    employees: state.employees.map(employee => ({
      key: employee.id,
      value: employee.id,
      text: `${employee.firstName} ${employee.lastName}`,
    })),
    levels: ([
        { key: 'ADMIN', value: 'ADMIN', text:'Admin' },
        { key: 'WRITE', value: 'WRITE', text: 'Write' },
        { key: 'REGULAR', value: 'REGULAR', text: 'Regular'},
      ])
    }
});

const mapDispatch = (dispatch, ownProps) => ({
  editUser(newInfo, id){

  },

});

export default connect(mapState, mapDispatch)(UserForm);
