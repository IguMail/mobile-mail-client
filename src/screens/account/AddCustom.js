import React from 'react'
import { View } from 'react-native'
import { observer, inject } from 'mobx-react'
import { Section, AccountHeader } from '../../theme'
import ErrorModal from '../../theme/ErrorModal'
import Form from '../../theme/Form'

const debug = require('../../lib/debug')('chaterr:account:custom')

const FIELD_REQ_MSG = 'This field is required'
const ACCOUNT_ADD_BTN_TITLE = 'ADD'

const style = {
  container: {
    marginTop: 45
  },
  formContainer: {
    justifyContent: 'center',
    padding: 30
  }
}

const form = {
  fields: {
    name: {
      label: 'NAME',
      error: null,
      value: '',
      defaultValue: '',
      required: true
    },
    accountType: {
      type: 'group',
      label: 'ACCOUNT TYPE',
      error: null,
      value: '',
      defaultValue: '',
      required: true,
      fields: {
        personal: {
          type: 'checkbox',
          label: 'Personal'
        },
        work: {
          type: 'checkbox',
          label: 'Work'
        }
      }
    },
    email: {
      label: 'EMAIL ID',
      error: null,
      value: '',
      defaultValue: '',
      required: true
    },
    password: {
      type: 'password',
      label: 'PASSWORD',
      error: null,
      value: '',
      defaultValue: '',
      required: true
    }
  }
}

@inject('getAccount')
@observer
class Login extends React.Component {

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

  onSubmit(form) {
    debug('submitted form', form)
  }

  onChangeText = (name, value) => {
    debug('text changed', name, value)
  }

  render() {

    if (this.getAccount.error) {
      const close = () => this.getAccount.dismissError()
      return <ErrorModal isVisible={true} errorMsg={this.getAccount.error.message} close={close} />
    }

    const onSubmit = state => {
      debug('Form submitted', state)
    }

    return (<Section style={style.container}>
      <AccountHeader title={'Add Other Account'} backButton={{ to: '/account/add' }} />
      <View style={style.formContainer}>
        <Form form={form} submitBtnTitle={ACCOUNT_ADD_BTN_TITLE} onSubmit={onSubmit} />
      </View>
    </Section>)
  }
}

export default Login;