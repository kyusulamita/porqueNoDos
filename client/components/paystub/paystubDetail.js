import React, { Component } from 'react';
import { getPaystub, deletePaystub } from '../../store';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PrintTemplate from 'react-print';

import { PaystubForm, EmployeeTile } from '../index';
import { Button, Table } from 'semantic-ui-react'
const { Header, Row, HeaderCell, Cell, Footer, Body } = Table;

class PaystubDetail extends Component{
  constructor(props){
    super(props);
    this.state = {
      toggleEdit: false,
      triggerDelete: 0,
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount(){
    const stubId = +this.props.match.params.stubId;
    this.props.getStub(stubId);
  }

  handleToggle(){
    if (this.state.triggerDelete){
      this.setState({triggerDelete: 0 });
    } else {
      this.setState(({toggleEdit}) => ({toggleEdit: !toggleEdit}))
    }
  }

  handleDelete(){
    if (this.state.triggerDelete === 3){
      const stubId = +this.props.match.params.stubId;
      const { employeeId } = this.props.currentStub;
      this.props.delete(stubId, employeeId);
    }
    this.setState(({triggerDelete}) => ({ triggerDelete: ++triggerDelete }));
  }
  componentWillReceiveProps(nextProps){
    const nextStubId = +nextProps.match.params.stubId;
    const stubId = +this.props.match.params.stubId;
    if (nextStubId !== stubId){
      this.props.getStub(nextStubId);
    }
    this.setState({ toggleEdit: false });
  }


  render(){
    if (!this.props.currentStub || !this.props.currentStub.YTD) return <div/>
    if (!this.props.isAuthorized) return <div> You don't have the right! </div>

    const { toggleEdit } = this.state;
    const atWarning = this.state.triggerDelete;
    const [ editColor, editContent ] = (toggleEdit || atWarning) ? ['red', 'Cancelar'] : ['green', 'Cambiar'];
    const warnings = ['Borrar', 'Seguro?', 'Segurisimo?', 'Aviso Final'];
    const deleteText = warnings[atWarning];

    const { currentStub } = this.props;
    const { employee, YTD, employeeId, rateType, id } = currentStub;
    const { stubs } = this.props.stubEmployee;
    const { next, prev } = stubs.find(stub => stub.id === id);

    const hourlyPay = (rateType === 'HOURLY');
    const [workedText, rateText] = hourlyPay ? ['Week Hours', 'Hourly Rate'] : ['Weeks Worked', 'Weekly Rate'];
    const deduction = Number(currentStub.gross - currentStub.pay).toFixed(2);
    const deductionYTD = Number(YTD.gross - YTD.pay).toFixed(2);
    return (
      <div>
        <div className='Aligner'>
          <div className='Aligner-item--top' />
          <EmployeeTile key={employee.id} {...employee} className='Aligner-item' />
          <div className='Aligner-item--bottom' />
        </div>
        <Table celled unstackable>
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
              <HeaderCell>{workedText}</HeaderCell>
              <HeaderCell>{rateText}</HeaderCell>
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
              <Cell>{hourlyPay ? currentStub.hours : '1'}</Cell>
              <Cell>{currentStub.rate}</Cell>
              <Cell>{currentStub.gross}</Cell>
              <Cell>{YTD.gross}</Cell>
              <Cell>Social Security</Cell>
              <Cell>{currentStub.taxSocial}</Cell>
              <Cell>{YTD.taxSocial}</Cell>
            </Row>
            <Row>
              <Cell>Vacation</Cell>
              <Cell></Cell>
              <Cell></Cell>
              <Cell></Cell>
              <Cell></Cell>
              <Cell>Federal Tax</Cell>
              <Cell>{currentStub.taxFederal}</Cell>
              <Cell>{YTD.taxFederal}</Cell>
            </Row>
            <Row>
              <Cell></Cell>
              <Cell></Cell>
              <Cell></Cell>
              <Cell></Cell>
              <Cell></Cell>
              <Cell>State Tax</Cell>
              <Cell>{currentStub.taxState}</Cell>
              <Cell>{YTD.taxState}</Cell>
            </Row>
            <Row>
              <Cell>Gross</Cell>
              <Cell></Cell>
              <Cell></Cell>
              <Cell>{currentStub.gross}</Cell>
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
              <Cell>{currentStub.pay}</Cell>
              <Cell>{YTD.pay}</Cell>
            </Row>
            <Row>
              <Cell></Cell>
              <Cell></Cell>
              <Cell></Cell>
              <Cell></Cell>
              <Cell></Cell>
              <Cell>Deduction Total</Cell>
              <Cell>{deduction}</Cell>
              <Cell>{deductionYTD}</Cell>
            </Row>
          </Body>
          <Footer>
            <Row>
              <HeaderCell colSpan='2'>Reporting Period</HeaderCell>
              <HeaderCell colSpan='2'>{currentStub.start} - {currentStub.end}</HeaderCell>
              <HeaderCell colSpan='2'>Pay Date</HeaderCell>
              <HeaderCell colSpan='2'>{currentStub.payDate}</HeaderCell>
            </Row>
          </Footer>
        </Table>
        <div className='Aligner'>
          <div className='Aligner-item--top' />
          <div className='Aligner-item'>
            <Button.Group>
              <Button disabled={!prev} as={Link} to={`/stubs/${prev}`}>Prev</Button>
              <Button.Or />
              <Button disabled={!next} as={Link} to={`/stubs/${next}`}>Next</Button>
            </Button.Group>
          </div>
          <div className='Aligner-item--bottom' />
        </div>
        {
          toggleEdit && <PaystubForm stub={this.props.currentStub} employeeId={employeeId} />
        }
        <Button
          onClick={this.handleToggle}
          color={editColor}
          content={editContent}
          />
        <Button
          onClick={this.handleDelete}
          color='red'
          content={deleteText}
          />
      </div>
    )
  }
}

const mapState = ({paystubs, employees, currentUser }, ownProps) => {
  const stubId = +ownProps.match.params.stubId;
  const currentStub = paystubs.find(stub => stub.id === stubId);
  const stubEmployee = employees.length && currentStub && employees.find(employee => employee.id === currentStub.employeeId);
  const isAuthorized = currentStub && (currentStub.employeeId === currentUser.employeeId);
  return ({
    isAuthorized,
    currentStub,
    stubEmployee
  })
}

const mapDispatch = (dispatch, ownProps) => ({
    getStub(stubId){
      dispatch(getPaystub(stubId));
    },
    delete(stubId, employeeId){
      dispatch(deletePaystub(stubId, employeeId));
    }
})

export default connect(mapState, mapDispatch)(PaystubDetail)
