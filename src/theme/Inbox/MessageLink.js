import React from 'react'
import styles from '../styles'
import inbox from '../styles/inbox'
import PriorityDot from '../PriorityDot'
import MessageIcon from '../MessageIcon'
import { View, Text } from "react-native"
import { TouchLink } from '../'
import moment from 'moment'

const style = {
  ...inbox
}

const MessageLink = props => {
  const { iconStyle, iconText, id, from, time, subject, priority } = props

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
  
  const iconSingleLetter = iconText || (from && from[0])

  return (<TouchLink style={style.MessageLink} to={'/message/' + id}>
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
  </TouchLink>)
}

export default MessageLink