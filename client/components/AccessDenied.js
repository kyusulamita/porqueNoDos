import React, { Component } from 'react';
import { Header, Icon, Image } from 'semantic-ui-react';

export default function AccessDenied(){
  return (
    <Header as='h2' icon textAlign='center'>
      <Icon name='ban circle' circular />
      <Header.Content>
        Access Denied
      </Header.Content>
    </Header>
  )
}
