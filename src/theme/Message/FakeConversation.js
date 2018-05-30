import React from 'react'
import { View } from 'react-native'
import conversation from '../styles/conversation'
import FakeMessage from './FakeMessage'

const style = {
  ...conversation
}

const FakeConversation = props => (
  <View>
    <View style={style.MessageList}>
      <FakeMessage />
    </View>
  </View>
)

export default FakeConversation