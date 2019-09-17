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
import { FormattedMessage } from 'react-intl'
import QrReader from 'react-qr-reader'
export default class QrscannerPageComp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      result: null
    }
  }
  handleSubmit () {

  }
  handleScan = data => {
    if (data) {
      this.setState({
        result: data
      })
    }
  }
  handleError = err => {
    console.error(err)
  }
  render () {
    return (
      <div>
        <Container>
          <Menu pointing>
            <Menu.Item
              name='QrScanner'
              active
              onClick={() => {}}
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
                        <label>{(<FormattedMessage id='label.transactionid' />)}</label>
                        <Input type='text' name='transactionid' fluid placeholder={this.props.intl.formatMessage({ id: 'label.transactionid' })} icon={<Icon name='lock' />} onChange={this.handleChange} />
                      </Form.Field>
                    </Form.Group>
                    {this.state.result && (<Form.Group widths='equal'>
                      <Form.Field>
                        <label>{(<FormattedMessage id='label.pin' />)}</label>
                        <Input type='text' name='pin' fluid placeholder={this.props.intl.formatMessage({ id: 'label.pin' })} icon={<Icon name='lock' />} onChange={this.handleChange} />
                      </Form.Field>
                    </Form.Group>)}
                    <Button primary onClick={this.handleSubmit} disabled={(this.props.isRequesting)}>{(<FormattedMessage id='label.submit_transaction' />)}</Button>
                  </Form>
                  {/* <p>{this.state.result}</p> */}
                </Grid.Column>
                <Grid.Column>
                  {this.state.result === null && (<QrReader
                    delay={300}
                    onError={this.handleError}
                    onScan={this.handleScan}
                    style={{ width: '100%' }}
                  />)}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Container>
      </div>
    )
  }
}
