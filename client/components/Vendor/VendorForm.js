import React, { Component } from 'react';
import { connect } from 'react-redux'

import { Form, Button } from 'semantic-ui-react';
const { Group, Input } = Form;

class VendorForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      date: '',
      product: '',
      amount: '',
      price: '',
    }
    this.handleOnSubmit= this.handleOnSubmit.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }
  handleOnChange(event, {name, value}){
    this.setState({ [name]: value });
  }

  handleOnSubmit(event){
    event.preventDefault();
    console.log(this.state);
    // if(!this.pt)
  }
  render(){
    const { date, product, amount, price} = this.state;
    const { placeholder, newForm, buttonText } = this.props;
    const { handleOnSubmit, handleOnChange } = this;
    const newAmount = (newForm) ? (+amount)  : (+amount || +placeholder.amount);
    const newPrice = (newForm) ? (+price) : (+price || +placeholder.price);
    const total = newAmount * newPrice;
    return(
        <Form onSubmit={handleOnSubmit}>
        <Group widths='equal'>
          <Input
            label='Date'
            placeholder={placeholder.date}
            name='date'
            value={date}
            required={newForm}
            onChange={handleOnChange}
          />
          <Input
            label='Product'
            placeholder={placeholder.product}
            name='product'
            value={product}
            required={newForm}
            onChange={handleOnChange}
          />
          <Input
            label='Amount'
            placeholder={placeholder.product}
            name='amount'
            value={amount}
            required={newForm}
            onChange={handleOnChange}
          />
          <Input
            label='Price'
            placeholder={placeholder.price}
            name='price'
            value={price}
            required={newForm}
            onChange={handleOnChange}
          />
          <Input
            label='Total'
            placeholder={placeholder.total}
            value={total}
          />
        </Group>
        <Button
          color='green'
          type='submit'
          content={buttonText}/>
      </Form>
    );
  }

}

const mapState = (state, ownProps) => {
  const placeholder = { date: 'MM/DD/YY', product: 'Enter Name', amount: 'Amount', price: 'Don\'t include $', total: 'Total'};

  return ({
    placeholder: ownProps.product || placeholder,
    newForm: !ownProps.product,
    buttonText: !ownProps.product ? 'Crear' : 'Cambiar'
  })
}

const mapDispatch = (dispatch, ownProps) => {

}
export default connect(mapState, mapDispatch)(VendorForm);