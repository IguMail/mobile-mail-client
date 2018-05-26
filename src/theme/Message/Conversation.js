import React from "react"
import { View, Text, Image } from "react-native"
import { TouchLink } from '../'
import styles from '../styles'
import conversation from '../styles/conversation'
import MessageLink from '../Message/MessageLink'
import Swipeout from 'react-native-swipeout'

const debug = require('debug')('chaterr:Conversation')

const style = {
  ...conversation
}

const Conversation = props => {

  const { messages } = props

  debug('threading conversation', messages)

  const MessageList = () => messages.map(message => {
    const { id, from, snippet, date } = message

    const deleteMessage = message => {
      debug('delete note', message)
    }

    const MoveIcon = () => (<TouchLink to="/">
      <Image source={require('../../images/search.png')} style={{
        width: 16,
        height: 16
      }} />
    </TouchLink>)

    const swipeBtns = [{
      component: <MoveIcon />,
      backgroundColor: 'red',
      underlayColor: 'rgba(0, 0, 0, 0.6)',
      onPress: () => deleteMessage(message)
    }]

    return (
      <View key={id} >
        <MessageLink {...message} from={from[0].name} time={date} />
      </View>
    )
  })

  return <View style={style.MessageList}>
    <MessageList />
  </View>
}

export default Conversation