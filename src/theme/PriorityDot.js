import React from 'react'
import { View } from "react-native"

const style = {
  dot: {
    width: 10,
    height: 10,
    backgroundColor: "#eeeeee",
    borderRadius: 100
  }
}

const priorityColors = {
  default: '#eeeeee',
  1: '#fc0a0a',
  2: '#f4ed42',
  3: '#81da61'
}

const priorityColor = (priority) => {
  return priorityColors[priority] || priorityColors.default
}

const priorityDot = props => <View style={{
  ...style.dot,
  backgroundColor: priorityColor(props.priority)
}} />

export default priorityDot
