import React from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'

import LoginPageComponent from '../../Components/Login/LoginPageComponent'
import FooterContainer from '../Footer/FooterContainer'

const TheComponent = props => (
  <LoginPageComponent
    history={props.history}
    footer={(<FooterContainer />)}
    {...props}
  />
)

const mapStateToProps = (state, ownProps) => {
  return {
    // isRequesting: QrcodeSelectors.isRequesting(state.qrcode),
    // qrimage: QrcodeSelectors.getQrimage(state.qrcode),
    // userid: QrcodeSelectors.getUserid(state.qrcode)
  }
}
const mapDispatchToProps = dispatch => {
  return {
    // qrcodeRequestPatch: query => dispatch(QrcodeActions.qrcodeRequestPatch(query)),
    // qrcodeRequest: query => dispatch(QrcodeActions.qrcodeRequest(query))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(TheComponent))
