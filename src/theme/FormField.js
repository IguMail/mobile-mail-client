import React from "react";
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { Row } from './'

const debug = require('../lib/debug')('chaterr:FormField')

class FormField extends React.PureComponent {

  state = {
    error: null,
    value: undefined
  }

  componentDidMount() {
    this.formInput.defaultValue = this.props.defaultValue
  }

  setValidationError(error) {
    this.setState({
      error
    })
  }

  render() {

    const { label, onChangeText, validate, formInputRef } = this.props

    const onChange = (value) => {
      debug("input changed", value)
      
      if (validate) {
        this.setValidationError(validate(value))
      }
      onChangeText && onChangeText(value)
    }

    const errorMsg = name => {
      return this.state.error && this.state.error.message
    }

    const inputRef = ref => {
      this.formInput = ref
      debug('ref', ref)
      formInputRef && formInputRef(ref)
    }

    return (<Row>
      <FormLabel>{label}</FormLabel>
      <FormInput ref={ref => inputRef(ref)} onChangeText={onChange} defaultValue={this.props.defaultValue} />
      <FormValidationMessage>{errorMsg()}</FormValidationMessage>
    </Row>)
  }
}

export default FormField;