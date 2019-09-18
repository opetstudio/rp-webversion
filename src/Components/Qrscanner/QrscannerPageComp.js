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
  Dropdown
} from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
import QrReader from 'react-qr-reader'
import { Redirect } from 'react-router-dom'
import AppConfig from '../../Config/AppConfig'
const basePath = AppConfig.basePath

const optionsSof = [
  {key: '01', text: 'RayaPay', value: '01'},
  {key: '02', text: 'Rekening Bank Mandiri', value: '02'},
  {key: '03', text: 'Rekening BRI', value: '03'}
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
      this.props.paymentpageRequestPatch({dataqr: data})
      this.props.paymentpageRequest({message: 'requesting', payload: {sof: this.props.sof, dataqr: this.props.dataqr}, url: '/generate-transaction', method: 'post'})
    }
  }
  handleError = err => {
    console.error(err)
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
                  />
                </Form.Field>
                <br />
                <br />
                <QrReader
                  delay={300}
                  onError={this.handleError}
                  onScan={this.handleScan}
                  style={{ width: '100%' }}
                />
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
      <div>
        <Container>
          <Menu pointing>
            <Menu.Item
              name='QrScanner'
              active
              onClick={() => {}}
            />
          </Menu>
          {this._scannerRender()}
        </Container>
      </div>
    )
  }
}
