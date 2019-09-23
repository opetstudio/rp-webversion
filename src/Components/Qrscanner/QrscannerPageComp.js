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
  {key: '01', text: 'RayaPay', value: '01', image: { avatar: true, src: Images.rayapay_logo }},
  {key: '02', text: 'Rekening Bank Mandiri', value: '02', image: { avatar: true, src: Images.bank_bri }},
  {key: '03', text: 'Rekening BRI', value: '03', image: { avatar: true, src: Images.bank_mandiri}}
]
export default class QrscannerPageComp extends Component {
  constructor (props) {
    super(props)
    this.state = {
      result: null
    }
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
        channelId: 'Majesty0001',
        serviceCode: '2002',
        currency: 'IDR',
        transactionNo: '01082017',
        transactionAmount: '1000',
        transactionDate: '09-08-2019 11:20:30',
        description: 'bayar uang SPP',
        customerName: 'Nofrets Poai',
        customerEmail: 'opetstudio@gmail.com',
        customerPhone: '085342805673',
        key: '5CBE964F5BA21',
        callbackURL: 'https://secure.plink.co.id/event-listener/landingpage?noInv=01082017&tgl=09-08-2019%2011%3A20%3A30&nama=risa%20paramita&noUnit=125&hunian=The%20Majesty&periode=August%202019&total=1000&lang=en',
        merchantName: 'smk',
        productCode: '125',
        period: 'August 2019',
        lang: 'en'
      })
      dataGenerateTrx = merge(dataGenerateTrx, {sof: this.props.sof, dataqr: this.props.dataqr})
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
    // if (v.name === 'cardNumber') {
    //   //  trim
    //   let cardNo = v.value
    //   if (cardNo.length === 16) {
    //     // hit luhn
    //     this.props.paymentpageRequest({message: 'requesting', payload: {cardNo}, url: '/card-checking/luhn-validate', method: 'post'})
    //   }
    // }
    this.props.paymentpageRequestPatch({[v.name]: v.value})
    // this.setState({firstName: v.value})
  }
  _scannerRender () {
    return (
      <Segment>
        <Grid celled='internally' columns='equal' stackable>
          <Grid.Row>
            <Grid.Column>
              <Form loading={this.props.isRequesting}>
                <Form.Field>
                  {/* <label style={{visibility: 'hidden'}}>.</label> */}
                  {/* <Input fluid placeholder='Middle name' /> */}
                  <label>Sumber Dana</label>
                  {/* <Select name='sof' fluid placeholder='sof' options={optionsSof} onChange={this.handleChange} /> */}
                  <Dropdown
                    options={optionsSof}
                    defaultValue={optionsSof[0].value}
                    onChange={(o, v) => this.handleChange({}, {type: 'dropdown', name: 'sof', value: v.value})}
                    style={{width: '70%', backgroundSize: '30%', padding: '1%'}}
                  />
                  <br/>
                  <hr/>
                  <br/>
                  <Input labelPosition='right' type='text' style={{width:'50%'}} placeholder='Merchant Bill Id'>
                    <Label basic>Bill Id</Label>
                    <input />
                  </Input>
                  <br/>
                  <br/>
                  <Input labelPosition='right' type='text' style={{width:'50%'}} placeholder='Amount'>
                    <Label basic>Rp</Label>
                    <input />
                  </Input>

                </Form.Field>
                <br />
                <br />
                <Grid.Row style={{backgroundColor: Colors.rp_gray2}}>
                  <QrReader
                    delay={300}
                    onError={this.handleError}
                    onScan={this.handleScan}
                    style={{ width: '100%', height: '90%', align: 'middle', padding: '3%'}}
                    // facingMode={'rear'}
                  />
                  <p style={{textAlign: 'center', color: Colors.white, mmargin: '1%', fontSize: '80%', fontSize: '3.5vw'}}>Pastikan Qr tidak rusak</p>
                </Grid.Row>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }
  render () {
    console.log('render => ', this.props)
    if (this.props.dataqrjsonstring !== null && this.props.dataqrjsonstring !== '') return window.open(`${basePath}/qrPaymentPage`, '_self', true)
    return (
      // <div style={{backgroundImage: 'url(' + Images.base_bg + ')', backgroundSize: '100% 100%', padding: '5%'}}>
        <Container>
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
          {this._scannerRender()}
        </Container>
      // </div>
    )
  }
}
