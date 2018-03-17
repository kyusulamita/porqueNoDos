import React, { Component } from 'react';
import { Connect } from 'react-redux'

import { Form, Button } from 'semantic-ui-react';
const { Group, Input } = Form;

class VendorForm extends Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){

    return(
        <Form>
        <Group widths='equal'>
          <Input label='Date' placeholder='Date' name='date'/>
          <Input label='Product' placeholder='Product' name='product' />
          <Input label='Amount' placeholder='Amount' name='amount' />
          <Input label='Price' placeholder='Price' name='price' />
        </Group>
        <Button color='green' type='submit'>Crear</Button>
      </Form>
    );
  }

}


export default VendorForm;
