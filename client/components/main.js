import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout} from '../store'
import { Menu } from 'semantic-ui-react'


class Main extends Component {
  constructor(props){
    super(props);
    this.state = { activeTab: 'home' };
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.loggedOutMenu = this.loggedOutMenu.bind(this);
    this.bonusAdminMenu = this.bonusAdminMenu.bind(this);
    this.loggedInMenu = this.loggedInMenu.bind(this);
    this.writeMenu = this.writeMenu.bind(this);
  }

  componentDidMount(){
    let currentLocation = this.props.location.pathname;
    currentLocation = currentLocation.split('/');
    this.setState({ activeTab: currentLocation[1]})
  }

  handleMenuClick(event, {name}){
    this.setState({ activeTab: name })
  }
  loggedInMenu(){
    const { activeTab } = this.state;
    const { onLogout} = this.props;
    return (
      <Menu.Menu position='right'>
        <Menu.Item name='salir' active={activeTab === 'salir'} onClick={onLogout} />
      </Menu.Menu>
    )
  }

  writeMenu(){
    const { activeTab } = this.state;
    return ([
      <Menu.Item name='perdidas' key='perdidas' active={activeTab === 'perdidos'} onClick={this.handleMenuClick} as={Link} to='/perdidas'/>,
      <Menu.Item name='vendedores' key='vendedores' active={activeTab === 'vendedores'} onClick={this.handleMenuClick} as={Link} to='/vendedores'/>,
    ])
  }
  bonusAdminMenu(){
    const { activeTab } = this.state;
    return ([
      <Menu.Item name='empleados' key='empleados' active={activeTab === 'empleados'} onClick={this.handleMenuClick} as={Link} to='/empleados'/>,
      <Menu.Item name='stubs' key='stubs' active={activeTab === 'stub'} onClick={this.handleMenuClick} as={Link} to='/stubs'/>,
      <Menu.Item name='usarios' key='usarios' active={activeTab === 'usarios'} onClick={this.handleMenuClick} as={Link} to='/usarios' />
    ])
  }

  loggedOutMenu(){
    const { activeTab } = this.state;
    return ([
      <Menu.Item name='entrar' active={activeTab === 'entrar'} key='entrar' onClick={this.handleMenuClick} as={Link} to='/entrar' />,
      <Menu.Item name='registrar' active={activeTab === 'registrar'} key='registrar' onClick={this.handleMenuClick} as={Link} to='/registrar' />
    ])
  }

 // handleMenuClick = this.handleMenuClick.bind(this);

  render(){
    const { children, isLoggedIn, isAdmin, writeAccess } = this.props;
    const { activeTab } = this.state;
    return (

      <div>
        <div><h1>La Bendicion - Grand Rapids, MI </h1></div>
        <Menu pointing secondary>
        {
          isLoggedIn && <Menu.Item name='home' active={activeTab === 'home'} onClick={this.handleMenuClick} as={Link} to='/home'/>
        }
        {
          (writeAccess || isAdmin)  && this.writeMenu()
        }
        {
          isAdmin && this.bonusAdminMenu()
        }
        {
          isLoggedIn ? this.loggedInMenu() : this.loggedOutMenu()
        }
        </Menu>
        <hr />
        {children}
      </div>
    )
  }
}
/**
 * CONTAINER
 */
const mapState = ({currentUser}) => {
  return {
    isLoggedIn: !!currentUser.id,
    isAdmin: (currentUser.adminLevel && (currentUser.adminLevel === 'ADMIN')),
    writeAccess: (currentUser.adminLevel && (currentUser.adminLevel === 'WRITE')),
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
