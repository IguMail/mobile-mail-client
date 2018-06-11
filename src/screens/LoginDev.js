import React from 'react'
import { View, Text } from 'react-native'
import { observer, inject } from 'mobx-react'
import { Section, Row, FormField, Logo, TouchLink } from '../theme'
import styles from '../theme/styles'
import { Button } from 'react-native-elements'
import ErrorModal from '../theme/ErrorModal'

const debug = require('debug')('chaterr:Login')

const style = {
  container: {
    ...styles.center
  },
  btnLogin: {
    ...styles.btnPrimary,
    width: 250,
    height: 50
  },
  signUpText: { 
    marginBottom: 30, 
    color: "#9aa7af" 
  },
  formContainer: {
  },
  form: {
  }
}

@inject('getAccount')
@observer
class Login extends React.Component {

  state = {
    form: {
      fields: {
        accountId: {
          error: null,
          value: '',
          defaultValue: 'mailsync2018@gmail.com'
        }
      }
    }
  }

  fields = {}

  get getAccount() {
    return this.props.getAccount
  }

  componentDidMount() {
    const fields = this.state.form.fields
    Object.keys(fields).forEach(
      key => {
        fields[key].value = fields[key].defaultValue
      }
    )
    this.setState({
      form: {
        fields
      }
    })
  }

  onSubmit() {
    const accountId = this.state.form.fields['accountId'].value
    this.getAccount.setAccountId(accountId)
    this.getAccount.fetch()

    global.getAccount = this.getAccount
    debug('sumitting form', accountId)

    this.props.onAccountId && this.props.onAccountId(accountId)

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
    return (<Section style={style.form}>
        <Row>
          <Text style={styles.fontDefault}>Developer/Tester Login</Text>
        </Row>
        <Row>
          <Text style={styles.fontDefault}>Login with any email account in system to test</Text>
          <Text style={styles.fontDefault}>Generate the email account by OAuth login first</Text>
        </Row>
        <Row>
          <FormField 
            ref={ref => this.fields['accountId'] = ref}
            label="Account ID (Email)" 
            defaultValue={this.state.form.fields['accountId'].defaultValue}
            onChangeText={value => this.onChangeText('accountId', value)}  
            />
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

    if (this.getAccount.error) {
      const close = () => this.getAccount.dismissError()
      return <ErrorModal isVisible={true} errorMsg={this.getAccount.error.message} close={close} />
    }

    return (<Section style={style.container}>
      <Row style={styles.center}>
        <Logo />
        <View style={{marginBottom: 40 }}>
          <Text style={styles.welcome}>Welcome to</Text>
          <Text style={styles.welcome}>Chatterr</Text>
        </View>
        <View style={style.formContainer}>
          {this.loginForm()}
        </View>
      </Row>
      <Row style={{ flex: 0 }}>
        <TouchLink to="/account/add">
          <Text style={style.signUpText}>Sign up for an account</Text>
        </TouchLink>
      </Row>
    </Section>)
  }
}

export default Login;