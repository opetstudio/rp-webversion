import React, { Component } from 'react'
import {
  Grid,
  Segment,
  Header,
  Image,
  Input,
  Button,
  Container,
  Icon,
  Form,
  Menu,
  Message,
  Select,
  Table,
  List,
  Card,
  Label,
  Dropdown
} from 'semantic-ui-react'
import {generateSha256, generatePayloadTransaction} from '../../Utils/Utils'
import { FormattedMessage } from 'react-intl'
import QrReader from 'react-qr-scanner'
import { Redirect } from 'react-router-dom'
import { merge } from 'ramda'
import AppConfig from '../../Config/AppConfig'
import {Images, Colors} from '../../Themes'
const basePath = AppConfig.basePath

const optionsSof = [
  {key: '01', text: 'RayaPay E-wallet', value: '01', image: { src: Images.rayapay_logo }},
  {key: '02', text: 'Rekening Mandiri', value: '02', image: { src: Images.bank_mandiri }},
  {key: '03', text: 'Rekening BRI', value: '03', image: { src: Images.bank_bri }}
]
export default class QrscannerPageComp extends Component {
  constructor (props) {
    super(props)
    this.state = {
      result: null
    }
    this.handleScan = this.handleScan.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleSubmit () {

  }
  handleScan = data => {
    if (data) {
    //   this.setState({
    //     result: data
    //   })
      if (this.props.isRequesting) return

      this.props.paymentpageRequestPatch({dataqr: data})
      let dataGenerateTrx = generatePayloadTransaction({
        pinhmac: '',
        channelId: 'prismaschid',
        serviceCode: '2002',
        currency: 'IDR',
        transactionNo: this.props.par4,
        transactionAmount: this.props.par5,
        transactionDate: '09-08-2019 11:20:30',
        description: 'bayar uang SPP',
        customerName: 'Nofrets Poai',
        customerEmail: 'opetstudio@gmail.com',
        customerPhone: '085342805673',
        key: '5CBE964F5BA21XXXX',
        callbackURL: 'https://localhost/event-listener/landingpage?noInv=01082017&tgl=09-08-2019%2011%3A20%3A30&nama=risa%20paramita&noUnit=125&hunian=The%20Majesty&periode=August%202019&total=1000&lang=en',
        merchantName: 'Prisma SCHID',
        productCode: '125',
        period: 'August 2019',
        lang: 'en'
      })
      dataGenerateTrx = merge(dataGenerateTrx, {sof: this.props.sof, dataqr: this.props.dataqr})
      console.log('dataGenerateTrx==>', dataGenerateTrx)
      this.props.paymentpageRequest({message: 'requesting', payload: dataGenerateTrx, url: '/transaction-api/generate-transaction', method: 'post'})
    }
  }
  handleError = err => {
    console.error(err)
    alert(err.message)
  }
  handleChange (o, v) {
    console.log('o===>', o)
    console.log('v===>', v)
    if (v.type === 'checkbox') {
      return this.props.paymentpageRequestPatch({[v.name]: v.checked})
    }
    if (v.name === 'amount') {
      return this.props.paymentpageRequestPatch({'par5': v.value})
    }
    if (v.name === 'invoice') {
      return this.props.paymentpageRequestPatch({'par4': v.value})
    }
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
  }
  _scannerRender () {
    return (
      <Grid celled='internally' columns='equal' stackable>
        <Grid.Row>
          <Grid.Column>
            <Form loading={this.props.isRequesting}>
              <Form.Field>
                <label>Sumber Dana</label>
                <Dropdown
                  icon={'get pocket'}
                  labeled
                  className='icon'
                  button
                  options={optionsSof}
                  defaultValue={optionsSof[0].value}
                  onChange={(o, v) => this.handleChange({}, {type: 'dropdown', name: 'sof', value: v.value})}
                  style={{width: '100%'}}
                />
              </Form.Field>
              <Form.Field>
                <Input label='INV' placeholder='Invoice Number' onChange={this.handleChange} name='invoice' defaultValue={this.props.par4} />
              </Form.Field>
              <Form.Field>
                <Input label='IDR' placeholder='Total Amount' onChange={this.handleChange} name='amount' defaultValue={this.props.par5} />
              </Form.Field>
              <Grid.Row style={{backgroundColor: Colors.rp_gray2}}>
                <QrReader
                  delay={300}
                  onError={this.handleError}
                  onScan={this.handleScan}
                  style={{width: '100%', align: 'middle', padding: '0'}}
                  // facingMode={'rear'}
                />
                <p style={{textAlign: 'center', color: Colors.white, padding: '10px', fontSize: '100%'}}>Pastikan Qr tidak rusak</p>
              </Grid.Row>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
  render () {
    console.log('render => ', this.props)
    if (this.props.dataqrjsonstring !== null && this.props.dataqrjsonstring !== '') return window.open(`${basePath}/qrPaymentPage`, '_self', true)
    return (
      // <div style={{backgroundImage: 'url(' + Images.base_bg + ')', backgroundSize: '100% 100%', padding: '5%'}}>
      <div>
        <Container style={{minHeight: 500}}>
          <p style={{textAlign: 'center', color: Colors.white, fontStyle: 'bold', fontSize: '100%', fontSize: '3.5vw'}}>Scan QrCode anda disini</p>
          <Menu pointing>
            <Menu.Item
              name='QrScanner'
              active
              onClick={() => {}}
            />

            <Menu.Item
              icon='log out'
              name='Logout'
              onClick={() => this.props.logout()}
            />
          </Menu>
          <Segment>
            {this._scannerRender()}
          </Segment>
        </Container>
        <br />
        <br />
        <br />
        <br />
        {this.props.footer}
      </div>
    )
  }
}
