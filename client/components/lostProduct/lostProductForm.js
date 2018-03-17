import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react'

const { Group, Input } = Form;

class LostProductForm extends Component{
  constructor(props){
    super(props)
    this.state = {

    };
  }

  render(){

    return(
        <Form onSubmit={this.handleOnSubmit}>
          <Group widths='equal'>
            <Input label='Nombre' placeholder={employee.firstName || 'Nombre'} name='firstName'onChange={this.handleChange} required={newForm} value={firstName}/>
            <Input label='Apellido' placeholder={employee.lastName || 'Apellido'} name='lastName' onChange={this.handleChange} required={newForm} value={lastName} />
            <Input label='Apellido' placeholder={employee.lastName || 'Apellido'} name='lastName' onChange={this.handleChange} required={newForm} value={lastName} />
          </Group>
          <Button color='green' type='submit'>{newForm ? 'Crear' : 'Confirmar'}</Button>
        </Form>
    )
  }
}


export default LostProductForm;
