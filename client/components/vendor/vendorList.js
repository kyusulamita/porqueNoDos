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
    this.adminBox = this.adminBox.bind(this);
  }
  adminBox(){
    const { editBool } = this.state;
    const [ color, content ] = editBool ? ['red', 'Cancelar'] : ['teal', 'Crear Nuevo'];
    return (
      <div className="Aligner">
        <div className="Aligner-item--top" />
          <div className="Aligner-item">
            {
              editBool &&  <VendorForm toggleView={this.onButtonClick} />
            }
            <Button
              color={color}
              content={content}
              onClick={this.onButtonClick}
            />
          </div>
        <div className="Aligner-item--bottom" />
      </div>
    )
  }
  onButtonClick(){
    this.setState(({editBool}) => ({ editBool: !editBool}));
  }
  render(){
    const {vendors, isAdmin} = this.props;
    return (
      <div className="Aligner">
        <div className="Aligner-item--top" />
        <div className="Aligner-item-wide">
          <Header as="h2" icon textAlign="center">
            <Icon name="users" circular />
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
          {
            isAdmin && this.adminBox()
          }
        </div>
        <div className="Aligner-item--bottom" />
      </div>
    )
  }
}

const mapState = ({currentUser, vendors}) => ({
  isAdmin: currentUser.adminLevel && currentUser.adminLevel === 'ADMIN',
  vendors
})

export default connect(mapState)(VendorList);

