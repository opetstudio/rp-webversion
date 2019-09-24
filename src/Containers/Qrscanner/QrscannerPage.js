import React, { Component } from 'react'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import LoginActions, {LoginSelectors} from '../Login/redux'
import { Redirect } from 'react-router-dom'
import QrscannerPageComp from '../../Components/Qrscanner/QrscannerPageComp'
import PaymentpageActions, {PaymentpageSelectors} from '../Paymentpage/redux'
import {isLoggedIn} from '../../Utils/Utils'
import AppConfig from '../../Config/AppConfig'
import Footer2 from '../../Containers/Paymentpage/Footer/footer2'

const basePath = AppConfig.basePath
class QrscannerPage extends Component {
  render () {
    // if (isLoggedIn(this.props.isLoggedIn) !== true) { return <Redirect to={`${basePath}/login`} /> }
    if (isLoggedIn(this.props.isLoggedIn) !== true) { return window.open(`${basePath}/login`, '_self', true) }
    return (<QrscannerPageComp
      footer={(<Footer2 />)}
      history={this.props.history}
      {...this.props}
    />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const par = {
    par1: PaymentpageSelectors.par1(state.paymentpage),
    par2: PaymentpageSelectors.par2(state.paymentpage),
    par3: PaymentpageSelectors.par3(state.paymentpage),
    par4: PaymentpageSelectors.par4(state.paymentpage),
    par5: PaymentpageSelectors.par5(state.paymentpage),
    par6: PaymentpageSelectors.par6(state.paymentpage),
    par7: PaymentpageSelectors.par7(state.paymentpage),
    par8: PaymentpageSelectors.par8(state.paymentpage),
    par9: PaymentpageSelectors.par9(state.paymentpage),
    par10: PaymentpageSelectors.par10(state.paymentpage),
    par11: PaymentpageSelectors.par11(state.paymentpage),
    par12: PaymentpageSelectors.par12(state.paymentpage),
    merchantName: PaymentpageSelectors.merchantName(state.paymentpage),
    productCode: PaymentpageSelectors.productCode(state.paymentpage),
    period: PaymentpageSelectors.period(state.paymentpage)
  }
  return {
    isLoggedIn: LoginSelectors.isLoggedIn(state.login),
    isRequesting: PaymentpageSelectors.isRequesting(state.paymentpage),
    par1: par.par1 !== '__PAR1__' ? par.par1 : '', // channelId
    par2: par.par2 !== '__PAR2__' ? par.par2 : '', // serviceCode
    par3: par.par3 !== '__PAR3__' ? par.par3 : '', // currency
    par4: par.par4 !== '__PAR4__' ? par.par4 : '', // transactionNo
    par5: par.par5 !== '__PAR5__' ? par.par5 : '', // transactionAmount
    par6: par.par6 !== '__PAR6__' ? par.par6 : '', // transactionDate
    par7: par.par7 !== '__PAR7__' ? par.par7 : '', // description
    par8: par.par8 !== '__PAR8__' ? par.par8 : '', // customerName
    par9: par.par9 !== '__PAR9__' ? par.par9 : '', // customerEmail
    par10: par.par10 !== '__PAR10__' ? par.par10 : '', // customerPhone
    par11: par.par11 !== '__PAR11__' ? par.par11 : '', // key
    par12: par.par12 !== '__PAR12__' ? par.par12 : '', // callbackurl
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
