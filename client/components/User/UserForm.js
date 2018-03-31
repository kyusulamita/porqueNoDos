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
  }

  render(){

  const { employees, levels } = this.props;

  return(
    <div>
      <Dropdown fluid selection options={employees} />
      <Dropdown fluid selection options={levels} />
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
