import React from 'react'
import ColorHash from 'color-hash'
import styles from '../../theme/styles'
import conversation from '../../theme/styles/conversation'
import MessageIcon from '../../theme/MessageIcon'
import { View, Text } from "react-native"
import { Section, Row } from '../../theme'

const debug = require('debug')('chaterr:Message:FakeMessage')

const style = {
  ...conversation
}

const FakeText = props => (
  <Text style={{
      width: '100%',
      opacity: 0.5
    }}
  >{props.children}</Text>
)

const FakeMessage = props => {
  return (<View style={style.MessageLink}>
    <MessageIcon style={{
      ...style.iconStyle,
      backgroundColor: '#eee'
    }} />
    
    <View style={style.messageTextContainer}>
      <View  style={{
          ...style.messageBody,
          opacity: 0.5,
          marginTop: 0,
          height: 40
        }}>
        <Text style={style.messagetextSubject} length={10}></Text>
      </View>
      <View>
        <FakeText style={style.messageTextTime}></FakeText>
      </View>
    </View>
  </View>)
}

export default FakeMessage