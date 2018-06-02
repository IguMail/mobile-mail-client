import React from "react"
import { observer } from 'mobx-react'
import { View, Text, Image } from "react-native"
import { TouchLink } from '../'
import styles from '../styles'
import inbox from '../styles/inbox'
import MessageLink from './MessageLink'
import Swipeout from 'react-native-swipeout'

const debug = require('debug')('chaterr:Inbox:ThreadList')

const style = {
  ...inbox
}

const MSG_INBOX_EMPTY = 'No Messages found'

const ThreadList = props => {

  const { threads } = props

  debug('Threads', threads)

  global.threads = threads // debug

  const threadsNotEmpty = threads
      .filter(thread => thread.messages.length && thread.messages[0].id)

  if (threadsNotEmpty.length === 0) {
    return <View style={styles.center}>
      <Text style={styles.fontDefault}>{MSG_INBOX_EMPTY}</Text>
    </View>
  }

  return <View style={style.MessageList}>
    {
      threadsNotEmpty
      .map( (thread, i) => {

          const message = (thread.messages && thread.messages[0]) || {}
          const { id, from, date, priority, subject } = message

          const fromName = (from && from[0] && from[0].name) || 'Unknown'

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
              key={i}
              left={swipeBtns}
              autoClose={true}
              buttonWidth={180}
              backgroundColor= 'transparent'>
              <MessageLink 
                key={i} id={id} from={fromName} time={date} subject={subject} priority={priority} />
            </Swipeout>
          )

        })
    }
  </View>
}

export default observer(ThreadList)