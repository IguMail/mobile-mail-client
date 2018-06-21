import React from 'react'
import { Section, FormField } from './'
import { Button } from 'react-native-elements'
import styles from './styles'
import FormGroup from './FormGroup'
import FormRow from './FormRow'

const debug = require('../lib/debug')('chaterr:form')

const FIELD_REQ_MSG = 'This field is required'

const style = {
  btnAddAccount: {
    ...styles.btnPrimary,
    width: 250,
    height: 50
  }
}

export default class Form extends React.Component {

  fields = {}

  state = {
    form: {}
  }

  componentWillMount() {
    debug('mount', this.props)
    const { form } = this.props
    this.setState({
      form
    })
  }

  componentDidMount() {
    this.setStateDefaultFieldValues()
  }

  setStateFormFields(fields) {
    this.setState({
      form: {
        fields
      }
    })
  }

  setStateDefaultFieldValues() {
    const { fields } = this.state.form
    Object.keys(fields).forEach(
      key => {
        fields[key].value = fields[key].defaultValue
      }
    )
    this.setStateFormFields(fields)
  }

  setStateFormField(name, field) {
    const { fields } = this.state.form
    fields[name] = {...fields[name], ...field}
    this.setStateFormFields(fields)
  }

  setStateFormFieldValue(name, value) {
    this.setStateFormField(name, { value })
  }

  setStateFormFieldError(name, error) {
    this.setStateFormField(name, { error })
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
        const error = this.validateField(name, field.value)
        if (error) {
          return { name, error }
        }
        return null
      })
      .filter(err => err)
    return errors
  }

  onSubmit() {
    debug('sumitting form')
    const { fields } = this.state.form
    const errors = this.validateForm()
    Object.entries(fields)
      .forEach( ([name, field]) => {
        const error = errors.find(error => error.name === name)
        field.error = error ? error.error : null
      })
    this.setStateFormFields(fields)
    if (errors.length) {
      return debug('Errors exist', errors)
    } else {
      this.props.onSubmit(this.state)
    }
  }

  onChangeText = (name, value) => {
    this.setStateFormFieldValue(name, value)
    if (this.props.onChangeText) {
      this.props.onChangeText(name, value)
    }
  }

  render() {

    debug('render state', this.state)

    const  { fields } = this.state.form

    const onCheckboxPress = (name, value) => {
      debug('onCheckboxPress', name, value)
      if (fields[name].value === value) {
        value = null
      }
      this.setStateFormFieldValue(name, value)
    }

    const validateField = (name, value) => {
      const error = this.validateField(name, value)
      this.setStateFormFieldError(name, error)
    }

    const Fields = Object.entries(fields).map( ([name, field]) => {
      const validFieldTypes = [null, undefined, 'text', 'password']
      debug('render field', name, field, validFieldTypes)
      if (validFieldTypes.includes(field.type)) {
        return <FormField 
            key={name}
            ref={ref => this.fields[name] = ref}
            label={field.label} 
            defaultValue={field.defaultValue}
            onChangeText={value => this.onChangeText(name, value)} 
            validate={value => validateField(name, value)}
            secureTextEntry={field.type === 'password'}
            error={field.error}
            value={field.value}
          />
      } else if (field.type === 'group') {
        return <FormGroup 
          name={name} 
          group={field} 
          onPress={onCheckboxPress} 
          validate={validateField} 
        />
      }
      return null
    })

    return (
      <Section style={style.form}>
        <FormRow>
          {Fields}
        </FormRow>
        <FormRow style={{alignItems: 'center'}}>
          <Button
            title={this.props.submitBtnTitle}
            titleStyle={{ fontWeight: "700" }}
            buttonStyle={style.btnAddAccount}
            containerStyle={{ marginTop: 20 }}
            onPress={() => this.onSubmit()}
          />
        </FormRow>
      </Section>
    )
  }
}