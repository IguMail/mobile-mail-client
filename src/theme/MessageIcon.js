import React from 'react'
import ColorHash from 'color-hash'
import { View } from "react-native"

const MessageIcon = props => (
  <View style={{
    width: 42,
    height: 42,
    backgroundColor: props.backgroundColor || (new ColorHash()).hex(props.text),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    ...props.style
  }}>
    {props.children}
  </View>
)

export default MessageIcon