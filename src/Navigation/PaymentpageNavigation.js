import React, { Component } from 'react'
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom'
// import { HashRouter as Router, Route, withRouter } from 'react-router-dom'

// Import Screens for the Router
// prettier-ignore
import ResponsiveContainer from '../Containers/Paymentpage/ResponsiveContainer'
// --- import list page entyty ---

import PaymentpageHome from '../Containers/Paymentpage/HomeContainer'
import PaymentpageCallback from '../Containers/Paymentpage/CallbackContainer'
import QrcodePage from '../Containers/Qrcode/QrcodePageContainer'
import LoginPageContainer from '../Containers/Login/LoginPageContainer'

class App extends Component {
  componentWillMount () {
    this.unlisten = this.props.history.listen((location, action) => {
      // this.props.onRouteChange(location)
      const loginRestriction = [
        '/login'
      ]
      if (loginRestriction.indexOf(location.pathname) !== -1) {
        this.props.checkLogedStatus()
      }
    })
  }
  componentWillUnmount () {
    this.unlisten()
  }
  render () {
    return <div>{this.props.children}</div>
  }
}
const AppContainer = withRouter(App)

class NavigationRouter extends Component {
  componentWillUpdate (prevProps) {
  }
  render () {
    // let basePath = '/PaymentPageCc' // for jboss
    let basePath = '/paymentpage' // for jboss
    // let basePath = '' // for docker
    return (
      <Router>
        <AppContainer checkLogedStatus={this.props.checkLogedStatus}>
          <ResponsiveContainer>
            <Route exact path={`${basePath}/creditcard/paymentPage`} component={PaymentpageHome} />
            <Route exact path={`${basePath}/creditcard/callback`} component={PaymentpageCallback} />
            <Route exact path={`${basePath}/qrcodepage/form-generate`} component={QrcodePage} />
            <Route exact path={`${basePath}/qrscanner`} component={QrcodePage} />
            <Route exact path={`${basePath}/login`} component={LoginPageContainer} />
          </ResponsiveContainer>
        </AppContainer>
      </Router>
    )
  }
}
export default NavigationRouter
