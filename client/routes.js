import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Router} from 'react-router'
import {Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import {Main, Login, Signup, UserHome, employeeList, employeeDetail,
        vendorList, vendorDetail } from './components'

// going to want to grab all vendors and employees right from the getGo
import {me, getEmployees, getPaystubs } from './store'



class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData()
  }

  render () {
    const {isLoggedIn} = this.props

    return (
      <Router history={history}>
        <Main>
          <Switch>
            <Route path='/entrar' component={Login} />
            <Route path='/registrar' component={Signup} />
            {
              isLoggedIn &&
                <Switch>
                  <Route path='/home' component={UserHome} />
                  <Route exact path='/empleados' component={employeeList} />
                  <Route path='/empleados/:employeeId' component={employeeDetail} />
                  <Route exact path ='/vendedores' component={vendorList} />
                  <Route path ='/vendedores/:vendorId' component={vendorDetail} />
                </Switch>
            }
            <Route component={Login} />
          </Switch>
        </Main>
      </Router>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.currentUser.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(me())
      dispatch(getEmployees())
      dispatch(getPaystubs())
    }
  }
}

export default connect(mapState, mapDispatch)(Routes)

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
