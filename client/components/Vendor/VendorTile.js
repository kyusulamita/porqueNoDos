import React, { Component } from 'react'

import { Link } from 'react-router-dom';
import { Card, Button, Image } from 'semantic-ui-react'

const { Content, Header, Meta, Description } = Card;

const VendorTile = ({name, id}) => (
  <Card key={id}>
    <Content>
      <Header>{name}</Header>
      <Meta>cuantos billes?</Meta>
      <Description>Desde aqui puede editar la informacion del vendedor.</Description>
    </Content>
    <Content extra>
      <div className='ui one buttons'>
        <Button basic color='teal'  as={Link} to={`/vendedores/${id}`}>Ver Mas Detalles</Button>
      </div>
    </Content>
  </Card>
)

export default VendorTile
