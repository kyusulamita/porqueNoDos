import React, { Component } from 'react';
import { Form, Button, Table } from 'semantic-ui-react'
import ContentEditable from 'react-contenteditable'
const {Row, Cell} = Table
const { Group, Input } = Form

class lostProductForm extends Component{
  constructor(props){
    super(props)
    this.state = {
      html: '<tr class><td class>Tue Mar 13</td><td class>Takis</td><td class>10</td><td class>% 11.90</td><td class><button class="ui button" role="button">Edit</button></td></class>'
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);

  }
  onChangeHandler(event){
    console.log(event);
    this.setState({html: event.target.value})
  }

  render(){
    const info = this.props.info || {}
    return (
        <ContentEditable
        html={this.state.html}
        disabled={false}
        onChange={this.onChangeHandler}
        />
    )
  }
}

export default lostProductForm;
