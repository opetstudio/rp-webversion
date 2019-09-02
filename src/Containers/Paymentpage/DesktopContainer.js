import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Menu,
  // Responsive,
  Segment,
  Visibility,
  // Dropdown,
  // Modal,
  // Header,
  Responsive
} from 'semantic-ui-react'

const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

class DesktopContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeIndex: 0
    }
    this.showFixedMenu = this.showFixedMenu.bind(this)
    this.hideFixedMenu = this.hideFixedMenu.bind(this)
    // this.logoutDialog = this.logoutDialog.bind(this)
  }

  hideFixedMenu () {
    return this.setState({ fixed: false })
  }
  showFixedMenu () {
    return this.setState({ fixed: true })
  }
  // logoutDialog (isShow) {
  //   this.setState({ showLogoutDialog: isShow })
  // }
  render () {
    const { children } = this.props
    const { fixed } = this.state
    const pathname = (window.location.hash || window.location.pathname).replace(
      '#',
      ''
    )
    // #/entity/participant
    let isHome =
      pathname === '/home' ||
      pathname === '/' ||
      pathname === '#/' ||
      pathname === '#/home'

    // isHome = false

    // const children = React.Children.map(this.props.children, (child, index) => {
    //   let TheComponent = child.thecomponent
    //   let addProps = {
    //     index,
    //     isActive: index === this.state.activeIndex,
    //     someFunction: () => this.setState({ activeIndex: index }),
    //     raisa: 'haloo'
    //   }
    //   // Object.defineProperty(child.props, 'render', (routerProps) => (<TheComponent {...routerProps} />))
    //   // child.props.render = (routerProps) => (<TheComponent {...routerProps} />)
    //   return React.cloneElement(child, addProps)
    // })

    // const ModalBasicExample = () => (
    //   <Modal open={this.state.showLogoutDialog} onClose={() => this.setState({showLogoutDialog: false})} basic size='small'>
    //     <Header icon='archive' content='Logout Confirmation' />
    //     <Modal.Content>
    //       <p>
    //         Apakah anda yakin ingin logout? Klik Yes untuk logout, Klik No untuk kembali ke Dashboard
    //       </p>
    //     </Modal.Content>
    //     <Modal.Actions>
    //       <Button basic color='red' inverted onClick={() => this.logoutDialog(false)}>
    //         <Icon name='remove' /> No
    //       </Button>
    //       <Button color='green' inverted onClick={() => { this.props.doLogout(); this.logoutDialog(false) }}>
    //         <Icon name='checkmark' /> Yes
    //       </Button>
    //     </Modal.Actions>
    //   </Modal>
    // )
    return (
      // <Responsive {...Responsive.onlyComputer}>

      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        {/* <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 0, padding: '0em 0em' }}
            // style={{ minHeight: isHome ? 700 : 0, padding: '1em 0em' }}
            vertical
          >
            <Menu
              // style={{backgroundColor: 'red', WebkitAppRegion: 'drag', WebkitUserSelect: 'none'}}
              // fixed={fixed ? 'top' : null}
              // fixed={fixed ? 'top' : null}
              inverted
              // inverted={false}
              // pointing={!fixed}
              // secondary={!fixed}
              size='small'
            >
              <Menu.Item as={Link} to='/' active={isHome}>Home</Menu.Item>
            </Menu>
          </Segment>
        </Visibility> */}
        {children}
      </Responsive>
      // </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node
}
export default DesktopContainer
// const mapStateToProps = (state) => {
//   return {
//     isLoggedIn: LoginSelectors.isLoggedIn(state.login)
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     // ignite boilerplate dispatch list
//     doLogout: (data) => dispatch(LoginActions.loginRemove(data))
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(DesktopContainer)
