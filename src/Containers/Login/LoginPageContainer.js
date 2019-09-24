import React from 'react'
import { connect } from 'react-redux'
import LoginActions, { LoginSelectors } from './redux'
import {isLoggedIn} from '../../Utils/Utils'
import LoginPageComponent from '../../Components/Login/LoginPageComponent'
import { injectIntl } from 'react-intl'
import Footer2 from '../../Containers/Paymentpage/Footer/footer2'
import AppConfig from '../../Config/AppConfig'
const basePath = AppConfig.basePath

class TheComponent extends React.PureComponent {
  render () {
    if (isLoggedIn(this.props.isLoggedIn) !== true) return (<LoginPageComponent {...this.props} footer={(<Footer2 />)} />)
    // if (isLoggedIn(this.props.isLoggedIn) !== true) return null
    // else return null
    else return window.open(`${basePath}/qrscanner`, '_self', true)
  }
}

const mapStateToProps = (state, ownProps) => {
  const isLoggedIn = LoginSelectors.isLoggedIn(state.login)
  console.log('mapStateToProps isLoggedIn=', isLoggedIn)
  return {
    isLoggedIn: LoginSelectors.isLoggedIn(state.login),
    formSubmitMessage: LoginSelectors.getFormSubmitMessage(state.login),
    responseMessage: LoginSelectors.responseMessage(state.login),
    responseDescription: LoginSelectors.responseDescription(state.login),
    responseCode: LoginSelectors.responseCode(state.login),
    isRequesting: LoginSelectors.isRequesting(state.login)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginDoLogin: data => dispatch(LoginActions.loginDoLogin(data)),
    loginPatch: data => dispatch(LoginActions.loginPatch(data))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(TheComponent))
