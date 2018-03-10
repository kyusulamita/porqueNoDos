import React, { Component } from 'react';
import { getEmployee } from '../../store';
import { StubRow } from '../paystub/paystubRow'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Header, Image, List } from 'semantic-ui-react';
import EmployeeForm from './employeeForm'

class employeeDetail extends Component{
  constructor (props){
    super(props);
    this.adminDisplay = this.adminDisplay.bind(this);
  }
  componentDidMount(){
    this.props.fetchEmployee();
  }

  adminDisplay(){
    return (
      <div>
        <div>Add a new stub</div>
        <EmployeeForm employee={this.props.employee} />
      </div>
    )
  }

  render() {
    const { employee, isAdmin } = this.props;
    if (!employee) return <div />
    const { firstName, lastName, stubs } = employee;
    return (
      <div>
        <Header as={'h2'}>
          <Image circular />
          {'  '}{firstName} {lastName}
          <Header.Subheader>
            {' '} Trabaja en el departamento
          </Header.Subheader>
        </Header>
        <div>Past pay check stubs</div>
        <List>
        {
          stubs.length && stubs.map(stub => <StubRow key={stub.id} {...stub} />)
        }
        </List>
        {
          isAdmin && this.adminDisplay()
        }
      </div>
    )
  }
}

const mapState = (state, ownProps) => {
  const employeeId = +ownProps.match.params.employeeId;
  const { employees, currentUser } = state;
  const employee = employees.find(employ => employ.id === employeeId);
  return ({
    isAdmin: (currentUser && !!currentUser.isAdmin),
    currentUser,
    employee,
  })
}

const mapDispatch = (dispatch, ownProps) => ({
    fetchEmployee: () => {
      const employeeId = +ownProps.match.params.employeeId;
      dispatch(getEmployee(employeeId));
    },
});

export default connect(mapState, mapDispatch)(employeeDetail);


employeeDetail.propTypes = {
  employee: PropTypes.object,
  isAdmin: PropTypes.bool,
  currentUser: PropTypes.object,
}
