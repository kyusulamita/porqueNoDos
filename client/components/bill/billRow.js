import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Table, Button } from 'semantic-ui-react';
const { Row, Cell, Body } = Table;

class BillRow extends Component{
  constructor(){
    super();
    this.state = {
      toggleEdit: false,
    };
  }

  render(){
    const {total, date} = this.props;
    return (
      <Body>
        <Row>
          <Cell>{date}</Cell>
          <Cell>{total}</Cell>
          <Cell>
            <Button
              color='green'
              primary
              content='Edit'
            />
          </Cell>
        </Row>
      </Body>
    );
  }
}

const mapState = (state, ownProps) => ({})

const mapDispatch = (dispatch, ownProps) => ({})

export default connect(mapState, mapDispatch)(BillRow);
