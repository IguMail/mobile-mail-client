import React from 'react'
import { Link } from 'react-router-native'
import { TouchableOpacity } from 'react-native'

export default props => 
  (<Link
    onPress={() => {}}
    component={TouchableOpacity}
    activeOpacity={0.8}
    {...props}>
    {props.children}
  </Link>)