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
export default class QrscannerPageComp extends Component {
  handleSubmit () {

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
                        <label>{(<FormattedMessage id='label.userid' />)}</label>
                        <Input type='text' name='userid' fluid placeholder={this.props.intl.formatMessage({ id: 'label.userid' })} icon={<Icon name='lock' />} onChange={this.handleChange} />
                      </Form.Field>
                    </Form.Group>
                    <Button primary onClick={this.handleSubmit} disabled={(this.props.isRequesting)}>{(<FormattedMessage id='label.generate' />)}</Button>
                  </Form>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Container>
      </div>
    )
  }
}
