import React from 'react'
import { observer } from 'mobx-react'
import { View } from 'react-native'
import conversation from '../styles/conversation'
import MessageLink from '../Message/MessageLink'

const debug = require('debug')('chaterr:Conversation')

const style = {
  ...conversation
}

const Conversation = observer(props => {

  const { messages } = props

  debug('threading conversation', messages)

  const MessageList = () => messages.map(message => {
    const { id, from, date } = message
    return (
      <MessageLink key={id} {...message} from={from[0].name} time={date} />
    )
  })

  return <View style={style.MessageList}>
    <MessageList />
  </View>
})

export default Conversation