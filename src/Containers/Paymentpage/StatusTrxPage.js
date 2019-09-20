import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { injectIntl } from 'react-intl'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import StatusTrxPageComp from '../../Components/Paymentpage/StatusTrxPageComp'
import { makeData } from '../../Utils/Utils'
// import LoginActions, { LoginSelectors } from '../Login/redux'
// import UserActions, { UserSelectors } from '../User/redux'
import PaymentpageActions, {PaymentpageSelectors} from './redux'
// import FavoriteItemContent from './favoriteItemContent'
// import LibraryItemContent from './libraryItemContent'
// import CustomItemContent from './customItemContent'
import Footer2 from './Footer/footer2'

// const User = LayoutTableData
const TheComponent = props => (
  <StatusTrxPageComp
    footer={(<Footer2 />)}
    history={props.history}
    {...props}
  />
)

const mapStateToProps = (state, ownProps) => {
  // const params = new URLSearchParams(window.location.search)
  // const filter = params.get('filter') // bar
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
    // ignite boilerplate state list
    // isLoggedIn: LoginSelectors.isLoggedIn(state.login),
    // loginToken: LoginSelectors.getToken(state.login),
    // myProfile: UserSelectors.getProfile(state.user),
    // filter,
    callbackUrl: PaymentpageSelectors.callbackUrl(state.paymentpage),
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
    merchantName: par.merchantName !== '__MERCHANT_NAME__' ? par.merchantName : '', // merchantName
    productCode: par.productCode !== '__PRODUCT_CODE__' ? par.productCode : '', // productCode
    period: par.period !== '__PERIOD__' ? par.period : '', // period
    message: PaymentpageSelectors.message(state.paymentpage),
    isRequesting: PaymentpageSelectors.isRequesting(state.paymentpage),
    firstName: PaymentpageSelectors.firstName(state.paymentpage),
    lastName: PaymentpageSelectors.lastName(state.paymentpage),
    cvv: PaymentpageSelectors.cvv(state.paymentpage),
    expireMonth: PaymentpageSelectors.expireMonth(state.paymentpage),
    expireYear: PaymentpageSelectors.expireYear(state.paymentpage),
    cardNumber: PaymentpageSelectors.cardNumber(state.paymentpage),
    shippingAddress: PaymentpageSelectors.shippingAddress(state.paymentpage),
    isShippingAddress: PaymentpageSelectors.isShippingAddress(state.paymentpage),
    isLuhnOk: PaymentpageSelectors.isLuhnOk(state.paymentpage),
    history: ownProps.history
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // ignite boilerplate dispatch list
    paymentpageRequestPatch: query => dispatch(PaymentpageActions.paymentpageRequestPatch(query)),
    paymentpageRequest: query => dispatch(PaymentpageActions.paymentpageRequest(query))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(TheComponent))
