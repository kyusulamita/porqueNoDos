import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {email, name, employeeInfo} = props
  console.log(employeeInfo)
  return (
    <div>
      <h3>Bienvenido, {name}</h3>
      <h4>Aqui esta su informacion de empleado</h4>
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
