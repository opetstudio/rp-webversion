import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { injectIntl } from 'react-intl'

import QrcodePageComponent from '../../Components/Qrcode/QrcodePageComponent'
import Footer2 from './Footer/footer2'
import QrcodeActions, {QrcodeSelectors} from './redux'

const TheComponent = props => (
  <QrcodePageComponent
    history={props.history}
    footer={(<Footer2 />)}
    {...props}
  />
)

const mapStateToProps = (state, ownProps) => {
  return {
    isRequesting: QrcodeSelectors.isRequesting(state.qrcode),
    qrimage: QrcodeSelectors.getQrimage(state.qrcode),
    userid: QrcodeSelectors.getUserid(state.qrcode)
  }
}
const mapDispatchToProps = dispatch => {
  return {
    qrcodeRequestPatch: query => dispatch(QrcodeActions.qrcodeRequestPatch(query)),
    qrcodeRequest: query => dispatch(QrcodeActions.qrcodeRequest(query))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(TheComponent))
