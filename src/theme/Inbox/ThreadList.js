import React from "react"
import { View, Text, Image } from "react-native"
import { TouchLink } from '../'
import styles from '../styles'
import inbox from '../styles/inbox'
import MessageLink from './MessageLink'
import Swipeout from 'react-native-swipeout'

const debug = require('debug')('chaterr:Inbox:MessageList')

const style = {
  ...inbox
}

const ThreadList = props => {

  const { threads } = props

  return <View style={style.MessageList}>
    {
      Object.keys(threads)
      .map(
        (key, i) => {

          const thread = threads[key]

          const message = thread.messages.pop()
          const { id, from, date, subject, priority } = message

          const deleteMessage = message => {
            debug('delete note', message)
          }
      
          const MoveIcon = () => (<TouchLink to="/" style={{
            ...styles.center,
            width: 90,
            flex: 1,
            borderRightColor: '#eee',
            borderRightWidth: 1
          }}>
            <Image source={require('../../images/moveTo.png')} style={{
              width: 16,
              height: 16
            }} />
            <Text style={style.SwipeIconText}>Move To</Text>
          </TouchLink>)

          const SnoozeIcon = () => (<TouchLink to="/" style={{
            ...styles.center,
            width: 90,
            flex: 1,
            borderRightColor: '#eee',
            borderRightWidth: 1
          }}>
            <Image source={require('../../images/clock.png')} style={{
              width: 16,
              height: 16
            }} />
            <Text style={style.SwipeIconText}>Snooze</Text>
          </TouchLink>)

          const LeftComponent = () => (
            <View style={{
              ...styles.center,
              width: 180,
              flex: 1,
              flexDirection: 'row',
              borderBottomColor: '#eee',
              borderBottomWidth: 1
            }}>
              <MoveIcon />
              <SnoozeIcon />
            </View>
          )
      
          const swipeBtns = [{
            component: <LeftComponent />,
            backgroundColor: 'transparent',
            underlayColor: 'rgba(0, 0, 0, 0.6)',
            onPress: () => deleteMessage(message)
          }]

          return (
            <Swipeout 
              key={id} 
              left={swipeBtns}
              autoClose={true}
              buttonWidth={180}
              backgroundColor= 'transparent'>
              <MessageLink 
                key={i} id={id} from={from[0].name} time={date} subject={subject} priority={priority} />
            </Swipeout>
          )

        })
    }
  </View>
}

export default ThreadList