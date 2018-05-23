import React from 'react'
import { View } from 'react-native'

const style = {
  dot: {
    width: 4,
    height: 4,
    backgroundColor: "#9aa7af",
    borderRadius: 100
  }
}

const Dot = props => <View style={{
  ...style.dot,
  ...(props.style || {})
}} />

export default Dot