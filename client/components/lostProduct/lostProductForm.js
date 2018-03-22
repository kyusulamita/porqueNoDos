import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Table } from 'semantic-ui-react';
import { addProduct, updateProduct } from '../../store';

const { Row, Cell } = Table;
const { Group, Input, Button } = Form;

class LostProductForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      date: '',
      product: '',
      amount: '',
      price: '',
    };
    this.handleOnSubmit= this.handleOnSubmit.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }
  handleOnChange(event, {name, value}){
    this.setState({ [name]: value });
  }

  handleOnSubmit(event){
    event.preventDefault();
    const { newForm } = this.props;
    if (newForm){
      this.props.add(this.state);
    } else {
      const updatedInfo = {};
      for (const key in this.state){
        if (this.state[key]) updatedInfo[key] = this.state[key];
      }
      this.props.update(this.props.placeholder.id, updatedInfo);
    }
    this.props.toggleView();
    this.setState({ date: '', product: '', amount: '', price: '' });
  }
  render(){
    const { date, product, amount, price} = this.state;
    const { placeholder, newForm, buttonText } = this.props;
    const { handleOnSubmit, handleOnChange } = this;
    const newAmount = (newForm) ? (+amount)  : (+amount || +placeholder.amount);
    const newPrice = (newForm) ? (+price) : (+price || +placeholder.price);
    const total = Number(newAmount * newPrice).toFixed(2);
    return (
      <Row><Cell colSpan='9'><div className='Aligner'>
        <div className='Aligner-item--top' />
        <Form onSubmit={handleOnSubmit} className='Aligner-item'>
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
            placeholder={placeholder.amount}
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
          <Button
            color='green'
            type='submit'
            content={buttonText}
          />
        </Group>
        </Form>
        <div className='Aligner-item--bottom'/>
      </div></Cell></Row>
    );
  }

}

const mapState = (state, ownProps) => {
  const placeholder = { date: 'MM/DD/YY', product: 'Enter Name', amount: 'Amount', price: 'Don\'t include $', total: 'Total'};

  return ({
    placeholder: ownProps.product || placeholder,
    newForm: !ownProps.product,
    buttonText: !ownProps.product ? 'Crear' : 'Confirmar'
  })
}

const mapDispatch = (dispatch, ownProps) => ({
  add(newLostProduct){
    dispatch(addProduct(newLostProduct));
  },
  update(id, lostProductUpdate){
    dispatch(updateProduct(id, lostProductUpdate));
  }
})
export default connect(mapState, mapDispatch)(LostProductForm);
