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
  Card
} from 'semantic-ui-react'
import moment from 'moment'
import { FormattedMessage } from 'react-intl'

class QrcodePageComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {activeItem: 'home'}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this._downloadQr = this._downloadQr.bind(this)
    this.handleItemClick = this.handleItemClick.bind(this)
  }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  handleChange (o, v) {
    console.log('handleChange v=', v)
    if (v.type === 'checkbox') {
      return
    //   return this.props.paymentpageRequestPatch({[v.name]: v.checked})
    }
    if (v.name === 'cardNumber') {
      return
      //  trim
    //   let cardNo = v.value
    //   if (cardNo.length === 16) {
    //     // hit luhn
    //     this.props.paymentpageRequest({message: 'requesting', payload: {cardNo}, url: '/card-checking/luhn-validate', method: 'post'})
    //   }
    }
    this.props.qrcodeRequestPatch({[v.name]: v.value})
    // this.setState({firstName: v.value})
  }
  handleSubmit () {
    let payload = {
      userid: this.props.userid
    }
    this.props.qrcodeRequest({message: 'requesting...', payload})
  }
  _downloadQr (imageQr) {

  }
  render () {
    // console.log('userid===>', this.props.userid)
    let imageQr
    if (this.props.qrimage) {
      imageQr = 'data:image/png;base64,' + this.props.qrimage
    }
    const { activeItem } = this.state
    var qrName = (this.props.userid || '').replace(/\.|@/g, '') // result: "this is a test"
    return (
      <div>
        <Container>
          <Menu pointing>
            <Menu.Item
              name='home'
              active={activeItem === 'home'}
              onClick={this.handleItemClick}
            />
            {/* <Menu.Item
              name='messages'
              active={activeItem === 'messages'}
              onClick={this.handleItemClick}
            /> */}
          </Menu>
          <Segment>
            <Grid celled='internally' columns='equal' stackable>
              <Grid.Row>
                <Grid.Column>
                  <Form loading={this.props.isRequesting}>
                    <Form.Group widths='equal'>
                      <Form.Field>
                        <label>{(<FormattedMessage id='label.userid' />)}</label>
                        <Input type='text' name='userid' fluid placeholder={this.props.intl.formatMessage({ id: 'label.userid' })} icon={<Icon name='lock' />} onChange={this.handleChange} />
                      </Form.Field>
                    </Form.Group>
                    <Button primary onClick={this.handleSubmit} disabled={(this.props.isRequesting)}>{(<FormattedMessage id='label.generate' />)}</Button>
                    <p>
                    Halaman ini adalah tools untuk membuat gambar QRCode sesuai standard aplikasi RayaPay (Rp). Cara menggunakan:
                    </p>
                    {(<List as='ol'>
                      <List.Item as='li'>Masukan User ID (NIK atau email atau nomor HP). Harus UNIK untuk setiap user.</List.Item>
                      <List.Item as='li'>Klik button "Generate QR". Gambar QRCode akan tampil.</List.Item>
                      <List.Item as='li'>Klik link "Click to download"</List.Item>
                    </List>)}
                    {/* {this.props.qrimage && <Button primary onClick={() => this._downloadQr(imageQr)} disabled={(this.props.isRequesting)}>{(<FormattedMessage id='label.download' />)}</Button>} */}
                  </Form>
                </Grid.Column>
                <Grid.Column id={'xxx'} textAlign='center'>
                  <Image src={imageQr || 'https://react.semantic-ui.com/images/avatar/large/daniel.jpg'} fluid />
                  {this.props.qrimage && <a href={imageQr} download={`qrcode-${qrName}`}>Click to download</a>}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Container>
        {this.props.footer}
      </div>
    )
  }
}

export default QrcodePageComponent
