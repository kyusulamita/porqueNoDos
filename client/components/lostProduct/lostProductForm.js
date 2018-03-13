import React, { Component } from 'react';
import { Form, Button, Table } from 'semantic-ui-react'
import ContentEditable from 'react-contenteditable'
const {Row, Cell} = Table
const { Group, Input } = Form

class lostProductForm extends Component{
  constructor(props){
    super(props)
    this.state = {
      html: '<tr><td>Tue Mar 13</td><td>Takis</td><td>10</td><td> 11.90</td><td><button class="ui button" role="button">Edit</button></td></tr>'
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
