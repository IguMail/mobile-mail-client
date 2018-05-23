import React from 'react'
import ColorHash from 'color-hash'
import styles from '../../theme/styles'
import conversation from '../../theme/styles/conversation'
import PriorityDot from '../../theme/PriorityDot'
import MessageIcon from '../../theme/MessageIcon'
import { View, Text, WebView, Image } from "react-native"
import { Section, Row, TouchLink } from '../../theme'
import moment from 'moment'

const debug = require('debug')('chaterr:Message:Link')

const style = {
  ...conversation
}

const MessageLink = props => {
  const { iconStyle, iconText, id, from, time, subject, priority, mail } = props

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

  debug('mail', mail)

  const text = mail.html.replace(/<(?:.|\n)*?>/gm, ' ').replace(/[ ]+/, ' ')

  return (<View style={style.MessageLink} to={'/message/' + id}>
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
      </View>
      <View  style={style.messageBody}>
        <TouchLink style={style.arrowDown}>
          <Image source={require('../../images/arrowDown.png')} style={{
            width: 10,
            height: 6
          }}/>
        </TouchLink>
        <Text style={style.messagetextSubject}>{text}</Text>
        <TouchLink style={style.replyIcon}>
          <Image source={require('../../images/icon_ios_reply_filled.png')} style={{
            width: 16,
            height: 14
          }}/>
        </TouchLink>
      </View>
      <View>
        <Text style={style.messageTextTime}>{dateFormatted}</Text>
      </View>
    </View>
  </View>)
}

export default MessageLink