import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addVendor, updateVendor } from '../../store';
import { Form, Button } from 'semantic-ui-react';
const { Input } = Form;

class VendorForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      name: '',
      address: '',
      city: '',
      state: '',
      zipcode: '',
      phoneNumber: '',
    }
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }
  handleOnChange(event, {name, value}){
    this.setState({ [name]: value });
  }

  handleOnSubmit(event){
    event.preventDefault();
    console.log(this.state);
    const { newForm } = this.props;
    if (newForm) {
      this.props.add(this.state);
    } else {
      const changedInfo = {};
      for (let key in this.state){
        if (this.state[key]) changedInfo[key] = this.state[key];
      }
      const { id } = this.props.placeholder;
      this.props.update(id, changedInfo);
    }
    this.props.toggleView();
  }
  render(){
    const { name, address, city, state, zipcode, phoneNumber } = this.state;
    const { placeholder, newForm, buttonText } = this.props;
    const { handleOnSubmit, handleOnChange } = this;
    return (
        <Form onSubmit={handleOnSubmit}>
          <Input
            label="Nombre"
            placeholder={placeholder.name}
            name="name"
            value={name}
            required={newForm}
            onChange={handleOnChange}
            width={16}
            inline
          />
          <Input
            label="Dirección"
            placeholder={placeholder.address}
            name="address"
            value={address}
            required={newForm}
            onChange={handleOnChange}
            width={16}
            inline
          />
          <Input
            label="Cuidad"
            placeholder={placeholder.city}
            name="city"
            value={city}
            required={newForm}
            onChange={handleOnChange}
            width={16}
            inline
          />
          <Input
            label="Estado"
            placeholder={placeholder.state}
            name="state"
            value={state}
            required={newForm}
            onChange={handleOnChange}
            width={16}
            inline
          />
          <Input
            label="Codigo Postal"
            placeholder={placeholder.zipcode}
            name="zipcode"
            value={zipcode}
            required={newForm}
            onChange={handleOnChange}
            width={16}
            inline
          />
          <Input
            label="Numero de Telefono"
            placeholder={placeholder.phoneNumber}
            name="phoneNumber"
            value={phoneNumber}
            required={newForm}
            onChange={handleOnChange}
            width={16}
            inline
          />
        <Button
          color="green"
          type="submit"
          content={buttonText}
        />
      </Form>
    );
  }

}

const mapState = (state, ownProps) => {
  const placeholder = { name: 'Nombre', address: 'Dirección', city: 'Cuidad', state: 'Estado', zipcode: 'Codigo Postal', phoneNumber: '(XXX) XXX-XXXX'};

  return ({
    placeholder: ownProps.vendor || placeholder,
    newForm: !ownProps.vendor,
    buttonText: !ownProps.product ? 'Crear' : 'Cambiar'
  })
}

const mapDispatch = (dispatch) => ({
  add(newVendor){
    dispatch(addVendor(newVendor));
  },
  update(id, vendorInfo){
    dispatch(updateVendor(id, vendorInfo));
  }
})

export default connect(mapState, mapDispatch)(VendorForm);
