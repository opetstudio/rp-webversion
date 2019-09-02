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
  Select
} from 'semantic-ui-react'
import {Images} from '../../Themes'
import {Helmet} from 'react-helmet'

class DetailTrxComponent extends Component {
  render () {
    return (
      <div>
        <Segment style={{ padding: '0em', borderBottom: 0 }} vertical>
          <Container>
            <Grid celled='internally' columns='equal' stackable>
              <Grid.Row>
                <Grid.Column>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>
      </div>
    )
  }
}

export default DetailTrxComponent
