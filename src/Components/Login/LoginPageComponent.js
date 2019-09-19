import React, { Component } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import {Images} from '../../Themes'

const messageBox = (msg, success) => (
  <Message success={success} negative={!success}>
    <p>{msg}</p>
  </Message>
)

class LoginPageComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userid: '',
      password: ''
    }
  }
  componentWillUnmount () {
    this.props.loginPatch({responseMessage: '', responseCode: '', responseDescription: ''})
  }
  handleChange = (e, { name, value }) => {
    this.setState({[name]: value})
  }
  _formOnSubmit (e, o) {
    if (e) e.preventDefault()
    this.props.loginDoLogin({
      userid: this.state.userid,
      password: this.state.password
    })
    return false
  }
  render () {
    return (<Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          <Image src='/logo.png' /> Log-in to your account
        </Header>
        <Form size='large' onSubmit={(e, o) => this._formOnSubmit(e, o)}>
          <Segment stacked>
            {this.props.responseCode !== '' && this.props.responseCode === 'MBDD00' && messageBox(this.props.responseDescription, true)}
            {this.props.responseCode !== '' && this.props.responseCode !== 'MBDD00' && messageBox(this.props.responseDescription, false)}
            <Form.Input name='userid' onChange={this.handleChange} fluid icon='user' iconPosition='left' placeholder='E-mail address' />
            <Form.Input
              name='password'
              onChange={this.handleChange}
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
            />

            <Button type='submit' color='teal' fluid size='large'>
            Login
            </Button>
          </Segment>
        </Form>
        <Message>
        New to us? <a href='#'>Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>)
  }
}
export default LoginPageComponent
