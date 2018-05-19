import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Section, Row, FormField, Logo } from '../theme'
import styles from '../theme/styles'
import button from '../theme/styles/button'
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const NUM_ERR_MSG = 'Phone number can contain + sign, numbers, dashes and spaces'
const PIN_ERR_MSG = 'Pin can only contain numbers'

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

  errors() {
    return Object.entries(this.state.form.fields)
      .map(([key, field]) => field.error)
      .filter(error => error)
  }

  values() {
    return Object.entries(this.state.form.fields)
      .map(([key, field]) => field.value)
      .filter(value => value)
  }

  signIn() {
    const errors = this.errors()
    if (errors.length) {
      return console.log('Errors exist', errors)
    }
    const values = this.values()
    if (values.length < 2) {
      return console.log('Fill in all fields', values)
    }
    console.log('sumitting form')
  }

  loginForm() {

    const onChangeText = (name, value) => {
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

    const errorMsg = name => this.state.form.fields[name].error

    const validateNumber = value => {
      if (!value.match(/^[0-9-+ ]+$/g)) {
        return new Error(NUM_ERR_MSG)
      }
    }

    const validatePin = value => {
      if (!value.match(/^[0-9]+$/g)) {
        return new Error(PIN_ERR_MSG)
      }
    }

    return (<Section>
        <Row>
          <FormField 
            label="PHONE NUMBER" 
            onChangeText={value => onChangeText('number', value)} 
            validate={value => validateNumber(value)} />
        </Row>
        <Row>
          <FormField 
            label="PIN" 
            onChangeText={value => onChangeText('pin', value)} 
            validate={value => validatePin(value)} />
        </Row>
        <Row>
        <Button
          title="SIGN IN"
          titleStyle={{ fontWeight: "700" }}
          buttonStyle={style.btnLogin}
          containerStyle={{ marginTop: 20 }}
          onPress={() => this.signIn()}
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