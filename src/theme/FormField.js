import React from "react";
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { Row } from './'

const debug = require('../lib/debug')('chaterr:FormField')

class FormField extends React.Component {

  componentDidMount() {
    this.formInput.defaultValue = this.props.defaultValue
  }

  render() {

    const { 
      label,
      onChangeText,
      validate,
      formInputRef,
      defaultValue,
      value,
      error
    } = this.props

    const onChange = value => {
      debug("input changed", value)
      if (validate) {
        validate(value)
      }
      onChangeText && onChangeText(value)
    }

    const inputRef = ref => {
      this.formInput = ref
      formInputRef && formInputRef(ref)
    }

    return (<Row>
      <FormLabel>{label}</FormLabel>
      <FormInput 
        ref={ref => inputRef(ref)} 
        onChangeText={onChange} 
        defaultValue={defaultValue} 
        value={value} 
      />
      {error && <FormValidationMessage>{error.message}</FormValidationMessage>}
    </Row>)
  }
}

export default FormField;