import React from 'react'
import ColorHash from 'color-hash'
import styles from '../theme/styles'
import inbox from '../theme/styles/inbox'
import PriorityDot from '../theme/PriorityDot'
import { View, Text } from "react-native"
import { Section, Row } from '../theme'
import moment from 'moment'

const style = {
  ...inbox
}

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



const MessageLink = props => {
  const { iconStyle, iconText, from, time, subject, priority } = props

  const date = new Date(time)
  const now = new Date()
  const timeDiffInMs = now.getTime() - date.getTime()
  const dayInMs = 1000 * 60 * 60 * 24
  const yearInMs = dayInMs * 365
  
  let dateFormatted
  if (timeDiffInMs < dayInMs) {
    dateFormatted = moment(time).format('H:mm')
  } else if (timeDiffInMs < yearInMs) {
    dateFormatted = moment(time).format('MMMM D')
  } else {
    dateFormatted = moment(time).format('MMMM D YYYYY')
  }
  const fromNow = moment(time).fromNow()
  const iconSingleLetter = iconText || from && from[0]

  return (<Row style={style.MessageLink}>
    <MessageIcon style={iconStyle} text={from}>
      <Text style={{
        ...styles.fontDefault,
        fontSize: 16,
        color: '#fff'
      }}>{iconSingleLetter}</Text>
    </MessageIcon>
    <View style={style.messageTextContainer}>
      <View style={style.messageTextHeader}>
        <View style={{
          flex: 1
        }}>
          <Text style={style.messageTextFrom}>{from}</Text>
        </View>
        <View>
          <Text style={style.messageTextTime}>{dateFormatted}</Text>
        </View>
      </View>
      <View>
        <Text style={style.messagetextSubject}>{subject}</Text>
        <View style={style.priorityDot}>
          <PriorityDot priority={priority} />
        </View>
      </View>
    </View>
  </Row>)
}

export default MessageLink