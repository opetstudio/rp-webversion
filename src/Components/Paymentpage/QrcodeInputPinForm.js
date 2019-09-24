import React, { Component } from 'react'
import {Form, Image, Button, Input} from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
import {Images, Colors} from '../../Themes'
import AppConfig from '../../Config/AppConfig'

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
      pin: '',
      amount: 0
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
    this.setState({[v.name]: v.value})
  }
  render () {
    return (
      <Form loading={this.props.isRequesting}>
        <Form.Field>
          <Input label='IDR' placeholder='Total Amount' onChange={this.props.handleChange} name='amount' defaultValue={this.props.par5} />
        </Form.Field>
        <Form.Field>
          {/* <label style={{position: 'relative'}}>
            {(<FormattedMessage id='label.pin' />)}
            <div style={{position: 'absolute', right: 0, bottom: 0}}>
              <Image src={mastercardicon} style={{width: 35, marginLeft: 10, display: 'inline'}} />
              <Image src={visaIcon} style={{width: 30, marginLeft: 10, display: 'inline'}} />
              <Image src={jcbicon} style={{width: 25, marginLeft: 10, display: 'inline'}} />
            </div>
          </label> */}
          <Input type='password' label='PIN' placeholder={this.props.intl.formatMessage({ id: 'label.pin' })} onChange={this.props.handleChange} name='pin' />
          {/* <Form.Input type='password' name='pin' placeholder={this.props.intl.formatMessage({ id: 'label.pin' })} onChange={this.handleChange} /> */}
        </Form.Field>
        <br />
        <Button primary onClick={() => this.props.handleSubmit()} disabled={(this.props.isRequesting)}>Bayar</Button>
        <Button style={{backgroundColor: Colors.rp_gray2}} primary onClick={() => window.open(AppConfig.basePath + '/qrscanner', '_self')}>Batal</Button>
      </Form>
    )
  }
}
