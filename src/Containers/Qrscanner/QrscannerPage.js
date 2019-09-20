import React, { Component } from 'react'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import LoginActions, {LoginSelectors} from '../Login/redux'
import { Redirect } from 'react-router-dom'
import QrscannerPageComp from '../../Components/Qrscanner/QrscannerPageComp'
import PaymentpageActions, {PaymentpageSelectors} from '../Paymentpage/redux'
import {isLoggedIn} from '../../Utils/Utils'
import AppConfig from '../../Config/AppConfig'

const basePath = AppConfig.basePath
class QrscannerPage extends Component {
  render () {
    // if (isLoggedIn(this.props.isLoggedIn) !== true) { return <Redirect to={`${basePath}/login`} /> }
    if (isLoggedIn(this.props.isLoggedIn) !== true) { return window.open(`${basePath}/login`, '_self', true) }
    return (<QrscannerPageComp
      history={this.props.history}
      {...this.props}
    />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isLoggedIn: LoginSelectors.isLoggedIn(state.login),
    isRequesting: PaymentpageSelectors.isRequesting(state.paymentpage),
    sof: PaymentpageSelectors.sof(state.paymentpage),
    dataqr: PaymentpageSelectors.dataqr(state.paymentpage),
    dataqrjsonstring: PaymentpageSelectors.dataqrjsonstring(state.paymentpage),
    urlVerifyTransaction: PaymentpageSelectors.urlVerifyTransaction(state.paymentpage)
  }
}
const mapDispatchToProps = dispatch => {
  return {
    paymentpageRequestPatch: query => dispatch(PaymentpageActions.paymentpageRequestPatch(query)),
    paymentpageRequest: query => dispatch(PaymentpageActions.paymentpageRequest(query)),
    logout: (data) => dispatch(LoginActions.loginRemove(data))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(QrscannerPage))
