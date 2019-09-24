import React, { Component } from 'react'
// import PropTypes from 'prop-types'
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
  Message,
  Select,
  Table,
  List
} from 'semantic-ui-react'
import moment from 'moment'
import { FormattedMessage } from 'react-intl'
import {Images,Colors} from '../../Themes'
import {Helmet} from 'react-helmet'
import {generateSha256, generatePayloadTransaction} from '../../Utils/Utils'
// import FormCc from './FormCc'
import QrcodeInputPinForm from './QrcodeInputPinForm'

const visaIcon = Images.visaicon
const jcbicon = Images.jcbicon
const mastercardicon = Images.mastercardicon
const pcidss = Images.pcidss
const sslsecurity = Images.sslsecurity
const prayapay = Images.rayapay_logo

// let minOffset = 0
let maxOffset = 20
let thisYear = (new Date()).getFullYear()
let allYears = []
for (let x = 0; x <= maxOffset; x++) {
  allYears.push(thisYear + x)
}

const optionsYear = allYears.map((x) => { return {key: x, text: x, value: x} })

const optionsMonth = [
  {key: '01', text: 'January', value: '01'},
  {key: '02', text: 'February', value: '02'},
  {key: '03', text: 'March', value: '03'},
  {key: '04', text: 'April', value: '04'},
  {key: '05', text: 'May', value: '05'},
  {key: '06', text: 'June', value: '06'},
  {key: '07', text: 'July', value: '07'},
  {key: '08', text: 'August', value: '08'},
  {key: '09', text: 'September', value: '09'},
  {key: '10', text: 'October', value: '10'},
  {key: '11', text: 'November', value: '11'},
  {key: '12', text: 'December', value: '12'}
]

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeItemBottomMenu: '1'
    //   firstName: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  //   componentWillMount () {
  //   }
  // componentDidUpdate (prevProps, prevState) {
  // }
  //   componentDidMount () {
  //   }
  handleChange (o, v) {
    if (v.type === 'checkbox') {
      return this.props.paymentpageRequestPatch({[v.name]: v.checked})
    }
    if (v.name === 'cardNumber') {
      //  trim
      let cardNo = v.value
      if (cardNo.length === 16) {
        // hit luhn
        this.props.paymentpageRequest({message: 'requesting', payload: {cardNo}, url: '/card-checking/luhn-validate', method: 'post'})
      }
    }
    this.props.paymentpageRequestPatch({[v.name]: v.value})
    // this.setState({firstName: v.value})
  }
  handleSubmit (pin) {
    // let cardType = ''
    // let cardNo = this.props.cardNumber
    // if (cardNo.startsWith('3')) cardType = 'JCB'
    // else if (cardNo.startsWith('4')) cardType = 'VISA'
    // else if (cardNo.startsWith('5')) cardType = 'MASTERCARD'
    // let trxid = Date.now()
    let dataGenerateTrx = generatePayloadTransaction({
      pinhmac: generateSha256(pin),
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
    // let payload = {
    //   'trxid': trxid,
    //   'channelId': this.props.par1,
    //   'serviceCode': this.props.par2,
    //   'currency': this.props.par3,
    //   'transactionNo': this.props.par4 !== '___PAR4__' ? this.props.par4 : '',
    //   'transactionAmount': this.props.par5,
    //   'transactionDate': this.props.par6,
    //   'callbackURL': this.props.par12,
    //   'description': this.props.par7,
    //   'customerName': this.props.par8,
    //   'customerEmail': this.props.par9,
    //   'customerPhone': this.props.par10,

    //   'cardNo': this.props.cardNumber,
    //   'cardExpiryYear': this.props.expireYear,
    //   'cardExpiryMonth': this.props.expireMonth,
    //   'cardSecurityCode': this.props.cvv,

    //   'cardType': cardType,
    //   'secretKey': this.props.par11
    // }

    this.props.paymentpageRequest({message: 'requesting...', payload: dataGenerateTrx, url: '/transaction-api/do-payment', method: 'post'})
  }
  _currencyDisplay (currency) {
    let cur = {
      'IDR': 'Rp'
    }
    if (cur.hasOwnProperty(currency)) {
      return cur[currency]
    }
    return 'Rp'
  }
  render () {
    console.log('render')
    // let currency = this._currencyDisplay(this.props.par3)
    // const messages = defineMessages({
    //   item: {
    //     id: 'app.item',
    //     // defaultMessage: '{count, plural, =0 {no itemsssss} one {# item} other {# items}}'
    //   }
    // })
    return (
      <div>
        {/* <Segment style={{ padding: '0em', borderBottom: 0 }} vertical> */}
        <Container>
          <div style={{backgroundColor: Colors.rp_gray2}}>
            <p style={{textAlign: 'center', fontSize: '100%', fontSize: '3.5vw', color: Colors.white}}>Transaction detail</p>
          </div>
          <Segment id={'segment1'}>
            <Image src={prayapay} style={{height: 45, display: 'inline'}} />
            {/* <Image src={pcidss} style={{height: 20, marginLeft: 20, display: 'inline'}} /> */}
            <Image src={sslsecurity} style={{height: 20, marginLeft: 20, display: 'inline'}} />
          </Segment>
          {/* <Segment style={{ marginTop: 10, marginBottom: 10 }} placeholder>
            <Image src={pcidss} style={{height: 25, display: 'inline'}} />
          </Segment> */}
          {/* <Header as='h2' style={{marginTop: 10}}> */}
          {/* <Image src={Images.blogger} style={{ width: '50%', cursor: 'pointer' }} onClick={() => window.open('https://opetstudio.blogspot.com', '_blank')} /> */}
          {/* <span>{(<FormattedMessage id='app.title' />)}</span> */}
          {/* <span>demo locale .{document.documentElement.lang} > {window.navigator.language}... {this.props.intl.locale}| {(<FormattedMessage values={{ count: 0 }} id='app.item' />)}</span> */}
          {/* </Header> */}
          <Segment id={'segment2'}>
            <Grid celled='internally' columns='equal' stackable>
              {/* <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'> */}
              <Grid.Row>
                <Grid.Column id={'transactiondetailpanel'}>
                  <Header id='headerdetailtransaction' as='h3'>
                    <span>{(<FormattedMessage id='header.detail_pembayaran' />)}</span>
                  </Header>
                  <List relaxed>
                    <List.Item>
                      <List.Header>{(<FormattedMessage id='label.nama' />)}</List.Header>
                      <List.Content>{this.props.par8}</List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Header>{(<FormattedMessage id='label.no_tagihan' />)}</List.Header>
                      <List.Content>{this.props.par4}</List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Header>{(<FormattedMessage id='label.no_unit' />)}</List.Header>
                      <List.Content>{this.props.productCode}</List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Header>{(<FormattedMessage id='label.nama_merchant' />)}</List.Header>
                      <List.Content>{this.props.merchantName}</List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Header>{(<FormattedMessage id='label.periode' />)}</List.Header>
                      <List.Content>
                        {this.props.period}
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Header>{(<FormattedMessage id='label.tanggal_transaksi' />)}</List.Header>
                      <List.Content>
                        {moment(this.props.par6, 'DD-MM-YYYY HH:mm:ss').format('DD-MM-YYYY')}
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Header>{(<FormattedMessage id='label.waktu_transaksi' />)}</List.Header>
                      <List.Content>
                        {moment(this.props.par6, 'DD-MM-YYYY HH:mm:ss').format('HH:mm:ss')}
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Header>{(<FormattedMessage id='label.total_bayar' />)}</List.Header>
                      <List.Content>
                        {`${this._currencyDisplay(this.props.par3)} ${this.props.intl.formatNumber(this.props.par5)}`}
                      </List.Content>
                    </List.Item>

                    {/* <List.Item>
                    <List.Content>
                      <List.Header>Description</List.Header>
                      {this.props.par7}
                    </List.Content>
                  </List.Item> */}
                  </List>

                  {/* <Table definition>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell width={2}>Customer Name</Table.Cell>
                      <Table.Cell>{`${this.props.par8}`}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell width={2}>Amount</Table.Cell>
                      <Table.Cell>{`${this.props.par3} ${this.props.par5}`}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Date</Table.Cell>
                      <Table.Cell>{this.props.par6}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Transaction No.</Table.Cell>
                      <Table.Cell>{this.props.par4}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Description</Table.Cell>
                      <Table.Cell>{this.props.par7}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table> */}
                </Grid.Column>
                <Grid.Column id={'inputkartupanel'} >
                  {/* <Header as='h3'>
                  <span>Pay with Credit Card</span>
                </Header> */}
                  {(this.props.message !== '00' && this.props.message !== '') &&
                    <Message error content={this.props.message} />
                  }
                  <QrcodeInputPinForm {...this.props} handleSubmit={this.handleSubmit}/>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Container>
        {/* </Segment> */}
        <br />
        <br />
        <br />
        <br />
        {this.props.footer}
      </div>
    )
  }
}

export default Home
