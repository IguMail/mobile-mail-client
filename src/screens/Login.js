import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Section, Row, FormField, Logo } from '../theme'
import styles from '../theme/styles'
import button from '../theme/styles/button'
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const NUM_ERR_MSG = 'Phone number can contain + sign, numbers, dashes and spaces'
const PIN_ERR_MSG = 'Pin can only contain numbers'
const FIELD_REQ_MSG = 'This field is required'

const btnFont = {
  fontFamily: "Lato",
  fontSize: 16,
  fontWeight: "500",
  fontStyle: "normal",
  letterSpacing: 0.57,
  textAlign: "center",
  color: "#ffffff"
}

const style = StyleSheet.create({
  btnLogin: {
    ...button.btnPrimary,
    width: 250,
    height: 50
  }
})

console.log('Styles', styles, style)

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
      })
      .filter(err => err)
    return errors
  }

  onSubmit() {
    const errors = this.validateForm()
    if (errors.length) {
      return console.log('Errors exist', errors)
    }
    console.log('sumitting form')
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
    console.log('Field values', this.state.form.fields)
  }

  loginForm() {

    const errorMsg = name => this.state.form.fields[name].error

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

    const slogan = () => (<View>
      <Text style={styles.slogan}>Welcome to</Text>
      <Text style={styles.slogan}>Chatterr</Text>
    </View>)

    return (<Section style={styles.center}>
      <Row>
        <Logo />
        {slogan()}
      </Row>
      <Row>
        {this.loginForm()}
      </Row>
    </Section>)
  }
}

export default Login;