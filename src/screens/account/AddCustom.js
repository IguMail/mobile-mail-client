import React from 'react'
import { View } from 'react-native'
import { observer, inject } from 'mobx-react'
import { Section, Row, FormField, AccountHeader } from '../../theme'
import { FormLabel, CheckBox } from 'react-native-elements'
import styles from '../../theme/styles'
import { Button } from 'react-native-elements'
import ErrorModal from '../../theme/ErrorModal'

const debug = require('../../lib/debug')('chaterr:account:custom')

const ACCOUNT_ADD_BTN_TITLE = 'ADD'

const style = {
  container: {
    marginTop: 45
  },
  btnAddAccount: {
    ...styles.btnPrimary,
    width: 250,
    height: 50
  },
  formContainer: {
    justifyContent: 'center',
    padding: 30
  },
  formRow: {
    ...styles.center
  },
  checkboxContainer: {
    borderColor: '#fff',
    backgroundColor: '#fff',
    flex: 1
  },
  checkboxRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
}

@inject('getAccount')
@observer
class Login extends React.Component {

  state = {
    form: {
      fields: {
        name: {
          label: 'NAME',
          error: null,
          value: '',
          defaultValue: ''
        },
        email: {
          label: 'EMAIL ID',
          error: null,
          value: '',
          defaultValue: ''
        },
        password: {
          label: 'PASSWORD',
          type: 'password',
          error: null,
          value: '',
          defaultValue: ''
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

    const  { fields } = this.state.form
    const Fields = Object.keys(fields).map( name => {
      const field = fields[name]
      return <FormField 
          key={name}
          ref={ref => this.fields[name] = ref}
          label={field.label} 
          defaultValue={field.defaultValue}
          onChangeText={value => this.onChangeText(name, value)} 
        />
    })

    const FormRow = props => (
      <Row style={[props.style, styles.formRow]}>{props.children}</Row>
    )

    return (
      <Section style={style.form}>
        <FormRow>
          <FormLabel>ACCOUNT TYPE</FormLabel>
          <View style={style.checkboxRow}>
            <CheckBox
              center
              title='Personal'
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checkedColor='#3f8efc'
              containerStyle={style.checkboxContainer}
            />
            <CheckBox
              center
              title='Work'
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checkedColor='#3f8efc'
              containerStyle={style.checkboxContainer}
            />
          </View>
        </FormRow>
        <FormRow>
          {Fields}
        </FormRow>
        <FormRow style={{alignItems: 'center'}}>
          <Button
            title={ACCOUNT_ADD_BTN_TITLE}
            titleStyle={{ fontWeight: "700" }}
            buttonStyle={style.btnAddAccount}
            containerStyle={{ marginTop: 20 }}
            onPress={() => this.onSubmit()}
          />
        </FormRow>
      </Section>
    )
  }

  render() {

    if (this.getAccount.error) {
      const close = () => this.getAccount.dismissError()
      return <ErrorModal isVisible={true} errorMsg={this.getAccount.error.message} close={close} />
    }

    return (<Section style={style.container}>
      <AccountHeader title={'Add Other Account'} backButton={{ to: '/account/add' }} />
      <View style={style.formContainer}>
        {this.loginForm()}
      </View>
    </Section>)
  }
}

export default Login;