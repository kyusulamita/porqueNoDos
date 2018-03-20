import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Router} from 'react-router'
import {Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import {Main, Login, Signup, UserHome, EmployeeList, EmployeeDetail,
        VendorList, VendorDetail, PaystubDetail, LostProductList, PaystubList } from './components'

// going to want to grab all vendors and employees right from the getGo
import {me, getEmployees, getPaystubs, getProducts, getVendors } from './store'



class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData()
    // console.log(this.props);
  }

  componentWillReceiveProps(nextProps){
    if (!this.props.isLoggedIn && nextProps.isLoggedIn){
      if (nextProps.isAdmin){
        this.props.loadAdminData();
      } else {
        this.props.loadUserData();
      }
    }
  }
  render () {
    const { isLoggedIn, isAdmin } = this.props

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
                  <Route exact path ='/vendedores' component={VendorList} />
                  <Route path ='/vendedores/:vendorId' component={VendorDetail} />
                  <Route exact path = '/perdidas' component={LostProductList} />
                  {
                    isAdmin &&
                      <Switch>
                        <Route exact path='/empleados' component={EmployeeList} />
                        <Route path='/empleados/:employeeId' component={EmployeeDetail} />
                        <Route exact path ='/stubs' component={PaystubList}/>
                        <Route path = '/stubs/:stubId' component={PaystubDetail} />
                      </Switch>
                  }
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
const mapState = ({currentUser}) => {
  return {
    isLoggedIn: !!currentUser.id,
    isAdmin: currentUser.adminLevel && currentUser.adminLevel === 'ADMIN',
  }
}

const mapDispatch = (dispatch, ownProps) => {
  console.log(ownProps)
  return {
    loadInitialData () {
      dispatch(me());
    },
    loadAdminData(){
      dispatch(getEmployees());
      dispatch(getPaystubs());
      dispatch(getProducts());
      dispatch(getVendors());
    },
    loadUserData(){
      console.log('normal user');
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
