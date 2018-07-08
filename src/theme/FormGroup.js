import React from 'react'
import { View } from 'react-native'
import { FormLabel, CheckBox, FormValidationMessage } from 'react-native-elements'
import FormRow from './FormRow'

const style = {
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

// TODO extend to support more than checkbox
export default ({ name, group, onPress, validate }) => {
    const { fields, error } = group

    const onPressCheckbox = (name, value) => {
      validate && validate(name, value)
      onPress && onPress(name, value)
    }

    return (
      <FormRow>
          <FormLabel>{group.label}</FormLabel>
          <View style={style.checkboxRow}>
            {
              Object.entries(fields).map( ([value, field]) => (
                <CheckBox
                  key={value}
                  center
                  title={field.label}
                  checkedIcon='dot-circle-o'
                  uncheckedIcon='circle-o'
                  checkedColor='#3f8efc'
                  checked={value === group.value}
                  onPress={() => onPressCheckbox(name, value)}
                  containerStyle={style.checkboxContainer}
                />
              ))
            }
          </View>
          {error && <FormValidationMessage>{error.message}</FormValidationMessage>}
        </FormRow>
    )
  }
