import React from 'react'
import conversation from '../../theme/styles/conversation'
import Avatar from '../../theme/Avatar'
import { View, Text } from "react-native"

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
    <Avatar style={{
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
