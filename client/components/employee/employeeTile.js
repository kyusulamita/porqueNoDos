import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Image } from 'semantic-ui-react';

const { Content, Header, Meta, Description } = Card;

const EmployeeTile = ({firstName, lastName, id}) => (
  <Card>
    <Content>
      <Header>{firstName} {lastName}</Header>
      <Meta>Trabaja en el departamento *replace*</Meta>
      <Description>Desde aqui puede editar el empleado.</Description>
    </Content>
    <Content extra>
      <div className='ui two buttons'>
        <Button>Editar</Button>
        <Button>Ver Mas Detalles</Button>
      </div>
    </Content>
  </Card>
);

EmployeeTile.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  id: PropTypes.string,
}

export default EmployeeTile;
