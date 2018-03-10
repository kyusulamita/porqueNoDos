import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {email, name} = props

  return (
    <div>
      <h3>Welcome, {name}</h3>
      <h4>This is going to be a very simple version of quickbooks! Woohoo, it's going to be an online app</h4>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = ({user}) => {
  return {
    email: user.email,
    name: user.name
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
}
