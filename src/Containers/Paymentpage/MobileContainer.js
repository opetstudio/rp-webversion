import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Container,
  Icon,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Image,
  Label,
  Input,
  Button
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

class MobileContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      menuEntityToggle: true
    }
    // this.handlePusherClick = this.handlePusherClick.bind(this)
    this.handleSidebarHide = this.handleSidebarHide.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
  }

  // handlePusherClick () {
  //   const { sidebarOpened } = this.state

  //   if (sidebarOpened) this.setState({ sidebarOpened: false })
  // }

  handleSidebarHide = () => this.setState({ sidebarOpened: false })

  handleToggle = () => this.setState({ sidebarOpened: true })

  render () {
    const { children } = this.props
    const { sidebarOpened } = this.state

    // const isHome =
    //   (window.location.hash || window.location.pathname).replace('#', '') ===
    //     '/home' ||
    //   (window.location.hash || window.location.pathname).replace('#', '') ===
    //     '/'

    const pathname = (window.location.hash || window.location.pathname).replace(
      '#',
      ''
    )
    // #/entity/participant
    const isHome =
      pathname === '/home' ||
      pathname === '/' ||
      pathname === '#/' ||
      pathname === '#/home'

    return (
      // <Responsive {...Responsive.onlyMobile}>
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation='push'
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <Menu.Item as={Link} to='/' active={pathname === '/'}>Home</Menu.Item>
          {/* <LoggedInAttribute
            attr='mainmenu'
            pathname={pathname}
            onLogout={() => this.setState({ sidebarOpened: false })}
            mobile
          /> */}
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened} style={{minHeight: window.innerHeight}}>
          {children}
        </Sidebar.Pusher>
      </Responsive>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node
}

export default MobileContainer
