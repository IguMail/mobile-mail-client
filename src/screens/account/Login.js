import React from "react"
import { View, Text } from "react-native"
import { Section, Row, FormField, Logo, TouchLink } from '../../theme'
import styles from '../../theme/styles'
import { Button } from 'react-native-elements'

const debug = require('../../lib/debug')('igumail:Login')

const NUM_ERR_MSG = 'Phone number can contain + sign, numbers, dashes and spaces'
const PIN_ERR_MSG = 'Pin can only contain numbers'
const FIELD_REQ_MSG = 'This field is required'

const style = {
  btnLogin: {
    ...styles.btnPrimary,
    width: 250,
    height: 50
  }
}

class Login extends React.Component {

  state = {
    form: {
      fields: {
        number: {
          error: null,
          value: ''
        },
        pin: {
          error: null,
          value: ''
        }
      }
    }
  }

  fields = {}

  validateNumber = value => {
    if (!value) {
      return new Error(FIELD_REQ_MSG)
    }
    if (!value.match(/^[0-9-+ ]+$/g)) {
      return new Error(NUM_ERR_MSG)
    }
  }

  validatePin = value => {
    if (!value) {
      return new Error(FIELD_REQ_MSG)
    }
    if (!value || !value.match(/^[0-9]+$/g)) {
      return new Error(PIN_ERR_MSG)
    }
  }

  validateForm = () => {
    const errors = Object.entries(this.state.form.fields)
      .map(([key, field]) => {
        const err = this.validateNumber(field.value)
        if (err && this.fields[key]) {
          this.fields[key].setValidationError(err)
          return err
        }
        return null
      })
      .filter(err => err)
    return errors
  }

  onSubmit() {
    const errors = this.validateForm()
    if (errors.length) {
      return debug('Errors exist', errors)
    }
    debug('sumitting form')
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

  loginForm() {
    return (<Section>
        <Row>
          <FormField 
            ref={ref => this.fields['number'] = ref}
            label="PHONE NUMBER" 
            onChangeText={value => this.onChangeText('number', value)} 
            validate={value => this.validateNumber(value)} />
        </Row>
        <Row>
          <FormField 
          ref={ref => this.fields['pin'] = ref}
            label="PIN" 
            onChangeText={value => this.onChangeText('pin', value)} 
            validate={value => this.validatePin(value)} />
        </Row>
        <Row>
        <Button
          title="SIGN IN"
          titleStyle={{ fontWeight: "700" }}
          buttonStyle={style.btnLogin}
          containerStyle={{ marginTop: 20 }}
          onPress={() => this.onSubmit()}
        />
          </Row>
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
        {this.loginForm()}
      </Row>
      <Row style={{ flex: 0 }}>
        <TouchLink to="/register">
          <Text style={{ marginBottom: 30, color: "#9aa7af" }}>Sign up for an account</Text>
        </TouchLink>
      </Row>
    </Section>)
  }
}

export default Login;
