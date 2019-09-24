import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import {
  Grid,
  Segment,
  Header,
  Image,
  Button,
  Container,
  List,
  Divider
} from 'semantic-ui-react'
import {Images} from '../../../Themes'
const IFRAME = "<iframe src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.535192635866!2d106.82013231506329!3d-6.192886995516727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f4213cdb2905%3A0x29b15e60f264a57a!2sPrisma+Seventh-Day+Adventist+Church+Jakarta!5e0!3m2!1sen!2sid!4v1551759903679' width='100%' height='450' frameborder='0' style='border:0' allowfullscreen />"

class Footer2Layout extends Component {
  constructor (props) {
    super(props)
    this.iframe = this.iframe.bind(this)
    this.state = {
      activeItemBottomMenu: '1'
    }
  }
  iframe () {
    return {
      __html: IFRAME
    }
  }
  componentWillMount () {
    this.setState({
      username: this.props.username
    })
  }
  componentWillReceiveProps (nextProps) {
    this.setState({
      accessToken: nextProps.username
    })
  }
  componentDidMount () {
  }
  render () {
    return (
      <div style={{width: '100%', bottom: 0}}>
        {/* <div style={{width: '100%', position: 'absolute', bottom: 0}}> */}
        <Segment vertical style={{ padding: '0em 0em' }}>
          <Container>
            <Grid divided stackable>
              {/* <Grid.Row>
                <Grid.Column>
                  <Header as='h4' inverted textAlign='center'>
                  ...
                  </Header>
                  <div>
                    <div dangerouslySetInnerHTML={this.iframe()} />
                  </div>
                </Grid.Column>
              </Grid.Row> */}
              <Grid.Row>
                <Grid.Column textAlign='center'>
                  <Image verticalAlign='middle' src={Images.rayapay_logo_putih} style={{maxHeight: 30}} />
                  {/* <span id='footertitle' >PT. Prismalink International</span> */}
                  {/* <p>Copyright © 2019 PT. Prismalink</p> */}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>
      </div>
    )
  }
}

export default Footer2Layout
