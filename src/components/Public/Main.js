import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import {
  Image,
  Header,
  Container,
  Button,
  Grid
} from 'semantic-ui-react'
import {
  Form
} from 'formsy-semantic-ui-react'

import '@/styles/main.scss'

@withRouter
@inject('store')
@observer
export default class Main extends Component {
  constructor (props) {
    super(props)
    this.store = this.props.store
    this.state = {
      retrieving: false
    }
    this.formSubmission = this.formSubmission.bind(this)
  }

  async formSubmission (data) {
    const { appState: { authenticate } } = this.store
    const { email, password } = data
    authenticate(email, password)
  }

  render () {
    const { retrieving } = this.state
    return <Container className='login' text>
      <Grid stackable verticalAlign='middle' columns={2}>
        <Grid.Row stretched>
          <Grid.Column>
            <div>
              <Image src={require('@/images/img_login_candidate')} style={{height: '210px'}} />
            </div>
          </Grid.Column>
          <Grid.Column>
            <Header as='h1'>
              Candidate Login.
              <Header.Subheader>
              Please login here to access your <strong>account</strong>.
              </Header.Subheader>
            </Header>
            <Form
              name='form'
              size='large'
              onValidSubmit={this.formSubmission}
            >
              <Form.Input
                type='email'
                name='email'
                label='EMAIL'
                placeholder='inbox@mail.com'
                size='large'
                required
                validations='isEmail'
                validationErrors={{ isEmail: 'Email is not valid' }}
                instantValidation
              />
              <Form.Input
                type='password'
                name='password'
                label='PASSWORD'
                placeholder='•••••••'
                size='large'
                required
                instantValidation
              />
              <Link className='forgot-password' to='/'>Forgot your password?</Link>
              <Button
                positive
                fluid
                size='large'
                disabled={retrieving}
                loading={retrieving}
              >
                Login
              </Button>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  }
}
