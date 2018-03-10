import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { Card, Button, Image } from 'semantic-ui-react';

const { Content, Header, Meta, Description } = Card;

const EmployeeTile = ({firstName, lastName, id}) => (
  <Card key={id} >
    <Content>
      <Header>{firstName} {lastName}</Header>
      <Meta>Trabaja en el departamento *replace*</Meta>
      <Description>Desde aqui puede editar la informacion del empleado.</Description>
    </Content>
    <Content extra>
      <div className='ui two buttons'>
        <Button basic color='teal'>Editar</Button>
        <Button basic color='teal' secondary as={Link} to={`/empleados/${id}`}>Ver Mas Detalles</Button>
      </div>
    </Content>
  </Card>
);

EmployeeTile.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  id: PropTypes.number,
}

export default EmployeeTile;
