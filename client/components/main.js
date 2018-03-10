import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout} from '../store'
import { Menu } from 'semantic-ui-react'
// import { Item } from Menu
/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
class Main extends Component {
  constructor(props){
    super(props);
    this.state = { activeTab: 'home' };
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.loggedOutMenu = this.loggedOutMenu.bind(this);
    this.loggedInMenu = this.loggedInMenu.bind(this);
  }

  componentDidMount(){
    let currentLocation = this.props.location.pathname;
    currentLocation = currentLocation.split('/');
    console.log(currentLocation[1])
    this.setState({ activeTab: currentLocation[1]})
  }

  handleMenuClick(event, {name}){
    this.setState({ activeTab: name })
  }
  loggedInMenu(){
    const { activeTab } = this.state;
    const { onLogout } = this.props;
    return (
    <Menu pointing secondary>
      <Menu.Item name='home' active={activeTab === 'home'} onClick={this.handleMenuClick} as={Link} to='/home'/>
      <Menu.Item name='empleados' active={activeTab === 'empleados'} onClick={this.handleMenuClick} as={Link} to='/empleados'/>
      <Menu.Item name='vendedores' active={activeTab === 'vendedores'} onClick={this.handleMenuClick} as={Link} to='/vendedores'/>
      <Menu.Menu position='right'>
        <Menu.Item name='salir' active={activeTab === 'salir'} onClick={onLogout} />
      </Menu.Menu>
    </Menu>)
  }

  loggedOutMenu(){
    const { activeTab } = this.state;
    return(
      <Menu pointing secondary>
        <Menu.Item name='home' active={activeTab === 'home'} onClick={this.handleMenuClick} as={Link} to='/home'/>
        <Menu.Item name='entrar' active={activeTab === 'entrar'} onClick={this.handleMenuClick} as={Link} to='/entrar' />
        <Menu.Item name='registrar' active={activeTab === 'registrar'} onClick={this.handleMenuClick} as={Link} to='/registrar' />
      </Menu>
    )
  }

 // handleMenuClick = this.handleMenuClick.bind(this);

  render(){
    const {children, isLoggedIn} = this.props;
    return (

      <div>
        <h1>Porque no los dos?</h1>
        <nav>
          {
            isLoggedIn
              ?
                this.loggedInMenu()
              :
                this.loggedOutMenu()
          }
        </nav>
        <hr />
        {children}
      </div>
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
    onLogout () {
      dispatch(logout())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  onLogout: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
