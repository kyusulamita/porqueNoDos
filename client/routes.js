import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Router} from 'react-router'
import {Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import {Main, Login, Signup, UserHome, EmployeeList, EmployeeDetail,
        VendorList, VendorDetail, PaystubDetail, LostProductList, PaystubList } from './components'

// going to want to grab all vendors and employees right from the getGo
import {me, getEmployees, getPaystubs, getProducts, getVendors, getEmployee } from './store'



class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData()
    // console.log(this.props);
  }

  componentWillReceiveProps(nextProps){
    if (!this.props.isLoggedIn && nextProps.isLoggedIn){
      console.log(nextProps);
      if (nextProps.isAdmin){
        this.props.loadAdminData();
      }
      this.props.loadUserData(nextProps.employeeId);
    }
  }
  render () {
    const { isLoggedIn, isAdmin, writeAccess } = this.props

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
                  {
                    writeAccess &&
                    [
                      <Route exact path ='/vendedores' component={VendorList} />,
                      <Route path ='/vendedores/:vendorId' component={VendorDetail} />,
                      <Route exact path = '/perdidas' component={LostProductList} />,
                    ]
                  }
                  {
                    isAdmin &&
                      [
                        <Route exact path='/empleados' component={EmployeeList} />,
                        <Route path='/empleados/:employeeId' component={EmployeeDetail} />,
                        <Route exact path ='/stubs' component={PaystubList}/>,
                        <Route path = '/stubs/:stubId' component={PaystubDetail} />,
                      ]
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
  const { adminLevel } = currentUser;
  const isAdmin = (adminLevel === 'ADMIN');
  const writeAccess = isAdmin || (adminLevel === 'WRITE')
  return {
    isLoggedIn: !!currentUser.id,
    employeeId: currentUser.employeeId,
    isAdmin,
    writeAccess,
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
    loadUserData(id){
      console.log('normal user');
      dispatch(getEmployee(id))
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
