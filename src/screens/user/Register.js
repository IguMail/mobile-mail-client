import React from 'react'
import { View, Text } from 'react-native'
import { observer, inject } from 'mobx-react'
import { Section, Row, Logo } from '../../theme'
import styles from '../../theme/styles'
import { Button } from 'react-native-elements'
import Form from '../../theme/Form'

const debug = require('../../lib/debug')('chaterr:Register')

const ACCOUNT_CREATE_BTN_TITLE = 'Sign Up'
const NUM_ERR_MSG = 'Phone number can contain + sign, numbers, dashes and spaces'
const PIN_ERR_MSG = 'Pin can only contain numbers'
const FIELD_REQ_MSG = 'This field is required'

const accountSuccessRoute = '/'
const accountSuccessMsgTime = 2000
let timerRoute = null

const style = {}

@inject('getAccount')
@observer
class Register extends React.Component {

  state = {
    form: {
      fields: {
        name: {
          label: 'Name',
          error: null,
          value: '',
          defaultValue: '',
          required: true
        },
        phone: {
          label: 'Phone Number',
          error: null,
          value: '',
          defaultValue: '',
          required: true,
          validate: this.validateNumber
        },
        pin: {
          label: 'Pin',
          error: null,
          value: '',
          defaultValue: '',
          required: true,
          validate: this.validatePin
        },
        confirmPin: {
          label: 'Confirm Pin',
          error: null,
          value: '',
          defaultValue: '',
          required: true,
          validate: this.validateConfirmPin
        }
      }
    }
  }

  fields = {}

  validateRequired = value => {
    if (!value) {
      return new Error(FIELD_REQ_MSG)
    }
  }

  validateNumber = value => {
    if (!value.match(/^[0-9-+ ]+$/g)) {
      return new Error(NUM_ERR_MSG)
    }
  }

  validatePin = value => {
    if (!value || !value.match(/^[0-9]+$/g)) {
      return new Error(PIN_ERR_MSG)
    }
  }

  validateConfirmPin = value => {
    if (!value) {
      return new Error(FIELD_REQ_MSG)
    }
    if (!value || !value.match(/^[0-9]+$/g)) {
      return new Error(PIN_ERR_MSG)
    }
  }

  validateForm = (form) => {
    const errors = Object.entries(this.state.form.fields)
      .map(([key, field]) => {
        let err
        if (field.required) {
          err = this.validateRequired(form.fields[key].value)
        }
        // TODO: other validations
        if (err && this.fields[key]) {
          this.fields[key].setValidationError(err)
          return err
        }
        return null
      })
      .filter(err => err)
    return errors
  }

  navigateToSuccessRoute() {
    debug('Navigating to ', accountSuccessRoute)
    this.props.history.push(accountSuccessRoute)
  }

  getUserFromForm(form) {
    const user = {}
    Object.entries(form.fields)
      .forEach(([name, entry]) => {
        user[name] = entry.value
      })
    return user
  }

  onSubmit(form) {
    const { getAccount } = this.props
    debug('form submitted', form)
    const errors = this.validateForm(form)
    if (errors.length) {
      return debug('Errors exist', errors)
    }
    debug('form submitted no errors', form)
    const user = this.getUserFromForm(form)
    debug('Creating user', user)
    const profile = { ...getAccount.profile, ...user }
    getAccount.createUserProfile(profile)
      .then(profile => {
        debug('user profile created remotely', profile)
        this.setState({
          success: {
            message: 'Your account was created successfully!'
          }
        })
        timerRoute = setTimeout(
          () => this.navigateToSuccessRoute(), 
          accountSuccessMsgTime
        )
      })
      .catch(error => {
        debug('Failed to create user', error)
        this.setState({ error })
      })
  }

  onChangeText = (name, value) => {
    let fields = this.state.form.fields
    fields[name].value = value
    this.setState({
      form: {
        fields: {
          ...fields
        }
      }
    })
    debug('Field values', this.state.form.fields)
  }

  RegisterForm() {
    return (<Section>
        <Form form={this.state.form} 
          submitBtnTitle={ACCOUNT_CREATE_BTN_TITLE} 
          onSubmit={form => this.onSubmit(form)} 
        />
      </Section>
    )
  }

  render() {

    return (<Section style={styles.center}>
      <Row style={styles.center}>
        <Logo />
        <View style={{marginBottom: 40 }}>
          <Text style={styles.welcome}>Welcome to</Text>
          <Text style={styles.welcome}>Chatterr</Text>
        </View>
        {this.RegisterForm()}
      </Row>
      <Row style={{ flex: 0 }}>
        <Text style={{ marginBottom: 30, color: "#9aa7af" }}>Sign up for an account</Text>
      </Row>
    </Section>)
  }
}

export default Register