import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Icon, Button, Card, Image } from 'semantic-ui-react'
// import EmployeeForm from './employeeForm'
import { VendorTile, VendorForm } from '../index'


class VendorList extends Component{
  constructor(props){
    super(props);
    this.state = {
      editBool: false,
    }
    this.onButtonClick = this.onButtonClick.bind(this);
    this.buttonRender = this.buttonRender.bind(this);
  }
  buttonRender(){
    const {editBool} = this.state;
    return (
      <div className='Aligner-item'>
        {
          editBool &&  <VendorForm />
        }
        <Button
          color={editBool ? 'red' : 'teal'}
          content={editBool ? 'Cancelar' : 'Crear Nuevo'}
          onClick={this.onButtonClick}
        />
      </div>
    )
  }
  onButtonClick(){
    this.setState(({editBool}) => ({ editBool: !editBool}));
  }
  render(){
    const {vendors, isAdmin} = this.props;
    const { editBool } = this.state;
    return (
      <div className='Aligner'>
        <div className='Aligner-item--top' />
        <div className='Aligner-item-wide'>
          <Header as='h2' icon textAlign='center'>
            <Icon name='users' circular />
            <Header.Content>
              Vendedores
            </Header.Content>
            Aqui estan sus hermosos venderdores
          </Header>
          <Card.Group centered >
          {
            vendors.map(vendor => <VendorTile key={vendor.id} {...vendor} />)
          }
          </Card.Group>
          <div className='Aligner'>
            <div className='Aligner-item--top' />

              {
                isAdmin && this.buttonRender()
              }
            <div className='Aligner-item--bottom' />
          </div>
        </div>
        <div className='Aligner-item--bottom' />
      </div>
    )
  }
}

const mapState = ({currentUser, vendors}) => ({
  isAdmin: currentUser && currentUser.isAdmin,
  vendors
})

export default connect(mapState)(VendorList);


