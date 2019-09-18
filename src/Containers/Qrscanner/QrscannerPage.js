import React, { Component } from 'react'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import QrscannerPageComp from '../../Components/Qrscanner/QrscannerPageComp'
import PaymentpageActions, {PaymentpageSelectors} from '../Paymentpage/redux'

class QrscannerPage extends Component {
  render () {
    return (<QrscannerPageComp
      history={this.props.history}
      {...this.props}
    />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
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
