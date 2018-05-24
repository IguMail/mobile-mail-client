import React from 'react'
import { View, Text, Image, ActivityIndicator } from 'react-native'
import conversation from '../styles/conversation'
import FakeMessage from './FakeMessage'

const style = {
  ...conversation
}

const FakeConversation = props => (
  <View style={style.MessageList}>
    <FakeMessage />
    <View><ActivityIndicator /></View>
  </View>
)

export default FakeConversation