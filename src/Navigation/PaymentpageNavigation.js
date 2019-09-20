import React, { Component } from 'react'
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom'
import AppConfig from '../Config/AppConfig'
// import { HashRouter as Router, Route, withRouter } from 'react-router-dom'

// Import Screens for the Router
// prettier-ignore
import ResponsiveContainer from '../Containers/Paymentpage/ResponsiveContainer'
// --- import list page entyty ---

import PaymentpageHome from '../Containers/Paymentpage/HomeContainer'
import StatusTrxPage from '../Containers/Paymentpage/StatusTrxPage'
import PaymentpageCallback from '../Containers/Paymentpage/CallbackContainer'
import QrcodePage from '../Containers/Qrcode/QrcodePageContainer'
import LoginPageContainer from '../Containers/Login/LoginPageContainer'
import QrscannerPage from '../Containers/Qrscanner/QrscannerPage'

const basePath = AppConfig.basePath
class App extends Component {
  componentWillMount () {
    this.unlisten = this.props.history.listen((location, action) => {
      // this.props.onRouteChange(location)
      console.log('props.history.listen ', window.location.pathname)
      const loginRestriction = [basePath + '/home', basePath + '/', basePath + '/merchant/create', basePath + '/qrscanner']
      if (loginRestriction.indexOf(location.pathname) !== -1) {
        this.props.checkLogedStatus({})
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
    return (
      <Router>
        <AppContainer checkLogedStatus={this.props.checkLogedStatus}>
          <ResponsiveContainer>
            <Route exact path={`${basePath}/creditcard/paymentPage`} component={PaymentpageHome} />
            {/* <Route exact path={`${basePath}/qrPaymentPage`} component={PaymentpageHome} /> */}
            <Route exact path={`${basePath}/verify-transaction/:trxpkg`} component={PaymentpageHome} />
            <Route exact path={`${basePath}/status-transaction/:trxpkg`} component={StatusTrxPage} />
            <Route exact path={`${basePath}/creditcard/callback`} component={PaymentpageCallback} />
            <Route exact path={`${basePath}/qrcodepage/form-generate`} component={QrcodePage} />
            <Route exact path={`${basePath}/qrscanner`} component={QrscannerPage} />
            <Route exact path={`${basePath}/login`} component={LoginPageContainer} />
          </ResponsiveContainer>
        </AppContainer>
      </Router>
    )
  }
}
export default NavigationRouter
