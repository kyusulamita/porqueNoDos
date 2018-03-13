import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Router} from 'react-router'
import {Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import {Main, Login, Signup, UserHome, EmployeeList, EmployeeDetail,
        VendorList, VendorDetail, PaystubDetail, LostProductList } from './components'

// going to want to grab all vendors and employees right from the getGo
import {me, getEmployees, getPaystubs, getProducts } from './store'



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
                  <Route exact path='/empleados' component={EmployeeList} />
                  <Route path='/empleados/:employeeId' component={EmployeeDetail} />
                  <Route exact path ='/stubs' />
                  <Route path = '/stubs/:stubId' component={PaystubDetail} />
                  <Route exact path ='/vendedores' component={VendorList} />
                  <Route path ='/vendedores/:vendorId' component={VendorDetail} />
                  <Route exact path = '/perdidas' component={LostProductList} />
                  <Route component={UserHome}/>
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
      dispatch(getProducts())
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
