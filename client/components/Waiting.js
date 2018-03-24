import React, { Component } from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

export default function Waiting(){
  return (
    <Dimmer active>
      <Loader>Loading</Loader>
    </Dimmer>
  )
}
