import React, { Component } from 'react';
import { getPaystub } from '../../store';
import { connect } from 'react-redux';

import EmployeeTile from '../employee/employeeTile'
import StubForm from '../paystub/paystubForm';

import { Button, Table } from 'semantic-ui-react'
const { Header, Row, HeaderCell, Cell, Footer, Body } = Table;

class PaystubDetail extends Component{
  constructor(props){
    super(props);
    this.state = { toggleEdit:false };
    this.handleToggle = this.handleToggle.bind(this);
  }

  componentDidMount(){
    this.props.getStub();
  }

  handleToggle(event){
    event.preventDefault();
    console.log('Hello', this.state.toggleEdit)
    this.setState(({toggleEdit}) => ({toggleEdit: !toggleEdit}))
  }


  render(){
    if (!this.props.currentStub || !this.props.currentStub.YTD) return <div/>
    const { employee, YTD } = this.props.currentStub;
    const { hours, rate, gross, taxSocial, taxFederal, taxState,pay } = this.props.currentStub;
    const { toggleEdit } = this.state;
    return (
      <div>
        <div className='Aligner'>
          <div className='Aligner-item--top' />
          <EmployeeTile key={employee.id} {...employee} className='Aligner-item' />
          <div className='Aligner-item--bottom' />
        </div>
        <Table celled>
          <Header>
            <Row>
              <HeaderCell  colSpan='4' textAlign='center'>Current Earnings</HeaderCell>
              <HeaderCell textAlign='center'>YTD Earnings</HeaderCell>
              <HeaderCell  colSpan='3' textAlign='center'>Deductions</HeaderCell>
            </Row>
          </Header>
          <Header>
            <Row>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Weekly Hours</HeaderCell>
              <HeaderCell>Hourly Rate</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
              <HeaderCell>Total</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Current</HeaderCell>
              <HeaderCell>YTD</HeaderCell>
            </Row>
          </Header>
          <Body>
            <Row>
              <Cell>Regular Time</Cell>
              <Cell>{hours ? hours : ''}</Cell>
              <Cell>{rate}</Cell>
              <Cell>{gross}</Cell>
              <Cell>{YTD.gross}</Cell>
              <Cell>Social Security</Cell>
              <Cell>{taxSocial}</Cell>
              <Cell>{YTD.taxSocial}</Cell>
            </Row>
            <Row>
              <Cell>Vacation</Cell>
              <Cell></Cell>
              <Cell></Cell>
              <Cell></Cell>
              <Cell></Cell>
              <Cell>Federal Tax</Cell>
              <Cell>{taxFederal}</Cell>
              <Cell>{YTD.taxFederal}</Cell>
            </Row>
            <Row>
              <Cell></Cell>
              <Cell></Cell>
              <Cell></Cell>
              <Cell></Cell>
              <Cell></Cell>
              <Cell>State Tax</Cell>
              <Cell>{taxState}</Cell>
              <Cell>{YTD.taxState}</Cell>
            </Row>
            <Row>
              <Cell>Gross</Cell>
              <Cell></Cell>
              <Cell></Cell>
              <Cell>{gross}</Cell>
              <Cell>{YTD.gross}</Cell>
              <Cell></Cell>
              <Cell></Cell>
              <Cell></Cell>
            </Row>
            <Row>
              <Cell></Cell>
              <Cell></Cell>
              <Cell></Cell>
              <Cell></Cell>
              <Cell></Cell>
              <Cell>Direct Deposit</Cell>
              <Cell>{pay}</Cell>
              <Cell>{YTD.pay}</Cell>
            </Row>
            <Row>
              <Cell></Cell>
              <Cell></Cell>
              <Cell></Cell>
              <Cell></Cell>
              <Cell></Cell>
              <Cell>Deduction Total</Cell>
              <Cell>{gross - pay}</Cell>
              <Cell>{YTD.gross - YTD.pay}</Cell>
            </Row>
          </Body>
          <Footer>
            <Row>
              <HeaderCell colSpan='2'>Reporting Period</HeaderCell>
              <HeaderCell colSpan='2'></HeaderCell>
              <HeaderCell colSpan='2'>Pay Date</HeaderCell>
              <HeaderCell colSpan='2'></HeaderCell>
            </Row>
          </Footer>
        </Table>
        <Table>
          <Row>
          </Row>
        </Table>
        {
          toggleEdit && <StubForm stub={this.props.currentStub} employeeId={employee.id} />
        }
        <Button onClick={this.handleToggle} color={toggleEdit ? 'red' : 'green'} >{toggleEdit ? 'Cancelar' : 'Editar'}</Button>
      </div>
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
