import React, { Component } from 'react'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import {LoginSelectors} from '../Login/redux'
import { Redirect } from 'react-router-dom'
import QrscannerPageComp from '../../Components/Qrscanner/QrscannerPageComp'
import PaymentpageActions, {PaymentpageSelectors} from '../Paymentpage/redux'
import {isLoggedIn} from '../../Utils/Utils'
import AppConfig from '../../Config/AppConfig'

const basePath = AppConfig.basePath
class QrscannerPage extends Component {
  render () {
    if (isLoggedIn(this.props.isLoggedIn) !== true) { return <Redirect to={`${basePath}/login`} /> }
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
    sof: PaymentpageSelectors.sof(state.paymentpage),
    dataqr: PaymentpageSelectors.dataqr(state.paymentpage),
    dataqrjsonstring: PaymentpageSelectors.dataqrjsonstring(state.paymentpage)
  }
}
const mapDispatchToProps = dispatch => {
  return {
    paymentpageRequestPatch: query => dispatch(PaymentpageActions.paymentpageRequestPatch(query)),
    paymentpageRequest: query => dispatch(PaymentpageActions.paymentpageRequest(query))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(QrscannerPage))
