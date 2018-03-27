import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import { Header, Image, List, Button, Comment } from 'semantic-ui-react';
import { PaystubRow } from './index';
/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const { email, name, employeeInfo } = props
  if (!employeeInfo) return <div />
  const { stubs, firstName, lastName, address, city, state, zipcode, phoneNumber, id } = employeeInfo;
  const stubExtra = { firstName, lastName, employeeId: id }
  console.log(employeeInfo)
  return (
    <div>
      <h3>Bienvenido, {name}</h3>
      <h4>Aqui esta su informacion de empleado</h4>

      <div>
        <Header as="h2" className="adminBox" textalign="center">
          <Image circular src="https://placebear.com/200/200" />
          {'  '}{firstName} {lastName}
          <Header.Subheader>
            {' '} Trabaja en el departamento
          </Header.Subheader>
        </Header>
        <div >
            <div textalign="left">{address}</div>
            <div textalign="left">{city}, {state} {zipcode}</div>
            <div textalign="left">{phoneNumber}</div>
        </div>
        <Comment.Group>
          <Header as="h3" dividing> Paystubs </Header>
          {
            stubs && stubs.map(stub => <PaystubRow key={stub.id} {...stub} {...stubExtra} personal />)
          }
        </Comment.Group>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = ({currentUser, employees}) => {
  return {
    email: currentUser.email,
    name: currentUser.name,
    employeeId: currentUser.employeeId,
    employeeInfo: employees.find(employee => employee.id === currentUser.employeeId)
  }
}
const mapDispatch = (dispatch, ownProps) => ({

})

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
}
