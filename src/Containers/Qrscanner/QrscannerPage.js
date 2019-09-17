import React, { Component } from 'react'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import QrscannerPageComp from '../../Components/Qrscanner/QrscannerPageComp'

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
  return {}
}
const mapDispatchToProps = dispatch => {
  return {}
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(QrscannerPage))
