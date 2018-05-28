import React from "react";
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { Row } from '../theme'

const debug = require('debug')('chaterr:FormField')

class FormField extends React.PureComponent {

  state = {
    error: null,
    value: ''
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
      <FormInput ref={ref => inputRef(ref)} onChangeText={onChange} />
      <FormValidationMessage>{errorMsg()}</FormValidationMessage>
    </Row>)
  }
}

export default FormField;