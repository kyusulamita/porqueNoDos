import React, { Component } from 'react';
import { Form, Table } from 'semantic-ui-react'

const { Row, Cell } = Table;

class LostProductForm extends Component{
  constructor(props){
    super(props);

  }

  render(){
    return (
      <Row>
        <Cell colSpan='6'>
          <Form>
            <Form.Group  widths='equal' >
              <Form.Input label='Date' placeholder='Date' type='date'/>
              <Form.Input label='Product' placeholder='Product' />
              <Form.Input label='Amount' placeholder='Amount' />
              <Form.Input label='Price' placeholder='Price' />
              <Form.Input label='Total' placeholder='Total' />
              <Form.Button color='green'>Confirmar</Form.Button>
            </Form.Group>
          </Form>
        </Cell>
      </Row>
    )
  }
}


export default LostProductForm;
