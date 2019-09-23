import React, { Component } from 'react'
import {Form, Image, Button} from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
import {Images} from '../../Themes'

const visaIcon = Images.visaicon
const jcbicon = Images.jcbicon
const mastercardicon = Images.mastercardicon
const pcidss = Images.pcidss
const sslsecurity = Images.sslsecurity
const plinkpayment = Images.plinkpayment

export default class QrcodeInputPinForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      pin: ''
    }
    this.handleChange = this.handleChange.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange (o, v) {
    // if (v.type === 'checkbox') {
    //   return this.props.paymentpageRequestPatch({[v.name]: v.checked})
    // }
    // if (v.name === 'cardNumber') {
    //   //  trim
    //   let cardNo = v.value
    //   if (cardNo.length === 16) {
    //     // hit luhn
    //     this.props.paymentpageRequest({message: 'requesting', payload: {cardNo}, url: '/card-checking/luhn-validate', method: 'post'})
    //   }
    // }
    // this.props.paymentpageRequestPatch({[v.name]: v.value})
    // this.setState({firstName: v.value})
    this.setState({pin: v.value})
  }
  render () {
    return (
      <Form loading={this.props.isRequesting}>
        <Form.Field>
          <label style={{position: 'relative'}}>
            {(<FormattedMessage id='label.pin' />)}
            <div style={{position: 'absolute', right: 0, bottom: 0}}>
              <Image src={mastercardicon} style={{width: 35, marginLeft: 10, display: 'inline'}} />
              <Image src={visaIcon} style={{width: 30, marginLeft: 10, display: 'inline'}} />
              <Image src={jcbicon} style={{width: 25, marginLeft: 10, display: 'inline'}} />
            </div>
          </label>
          <Form.Input type='password' name='pin' placeholder={this.props.intl.formatMessage({ id: 'label.pin' })} onChange={this.handleChange} />
        </Form.Field>
        <br />
        <Button primary onClick={() => this.props.handleSubmit(this.state.pin)} disabled={(this.props.isRequesting)}>Bayar</Button>
      </Form>
    )
  }
}
