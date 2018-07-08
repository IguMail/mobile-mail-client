import React from 'react'
import { View } from 'react-native'
import { observer, inject } from 'mobx-react'
import { Section, AccountHeader } from '../../theme'
import ErrorModal from '../../theme/ErrorModal'
import Form from '../../theme/Form'
import form from './form'

const debug = require('../../lib/debug')('igumail:account:custom')

const FIELD_REQ_MSG = 'This field is required'
const ACCOUNT_ADD_BTN_TITLE = 'ADD'

const accountSuccessRoute = '/inbox'
const accountSuccessMsgTime = 2000
let timerRoute = null

const style = {
  container: {
    marginTop: 45
  },
  formContainer: {
    justifyContent: 'center',
    padding: 30
  }
}

@inject('getAccount')
@observer
export default class CreateUserCustom extends React.Component {

  state = {
    error: null,
    success: null
  }

  get getAccount() {
    return this.props.getAccount
  }

  validateField(name, value) {
    const { fields } = this.state.form
    if (fields[name].required && !value) {
      return new Error(FIELD_REQ_MSG)
    }
  }

  validateForm = () => {
    const { fields } = this.state.form
    const errors = Object.entries(fields)
      .map(([name, field]) => {
        const err = this.validateField(name, field.value)
        if (err) {
          const ref = this.fields[name]
          if (ref) {
            ref.setValidationError(err)
          }
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
    this.getAccount.fetch()
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
    debug('Form submitted', form)
    const user = this.getUserFromForm(form)
    debug('Creating user', user)
    const profile = {
      account: user.email,
      user
    }
    this.getAccount.setUserProfile(profile)
      .then(profile => this.getAccount.setAccountId(user.email))
      .then(profile => {
        this.getAccount.created = profile
      })
      .then(profile => {
        debug('user profile created locally', profile)
        this.setState({
          success: {
            message: 'user created successfully!'
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

  render() {

    if (this.getAccount.error) {
      const close = () => this.getAccount.dismissError()
      return <ErrorModal isVisible={true} errorMsg={this.getAccount.error.message} close={close} />
    }

    if (this.state.error) {
      const close = () => this.setState({ error: null })
      return <ErrorModal isVisible={true} errorMsg={this.state.error.message} close={close} />
    }

    if (this.state.success) {
      const close = () => {
        clearTimeout(timerRoute)
        this.setState({ success: null })
        this.navigateToSuccessRoute()
      }
      return <ErrorModal isVisible={true} errorMsg={this.state.success.message} close={close} />
    }

    return (<Section style={style.container}>
      <AccountHeader title={'Add Other Account'} backButton={{ to: '/account/add' }} />
      <View style={style.formContainer}>
        <Form form={form} submitBtnTitle={ACCOUNT_ADD_BTN_TITLE} onSubmit={form => this.onSubmit(form)} />
      </View>
    </Section>)
  }
}
