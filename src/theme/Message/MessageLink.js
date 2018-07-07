import React from 'react'
import { autorun } from 'mobx'
import { observer } from 'mobx-react'
import styles from '../../theme/styles'
import conversation from '../../theme/styles/conversation'
import Avatar from '../../theme/Avatar'
import { View, Text, Image } from "react-native"
import { TouchLink } from '../../theme'
import AttachmentList from '../../theme/Message/AttachmentList'
import moment from 'moment'

const debug = require('../../lib/debug')('chaterr:Message:Link')

const style = {
  ...conversation
}

const MSG_SENDING = 'sending...'
const ERR_SEND_FAIL = 'send failed!'
const MSG_SENT = 'sent'

// debug
autorun(() => {
  debug('autorun')
})

const Attachments = props => {
  const { attachments } = props
  return (attachments && attachments.length) ? 
  (<View style={style.attachments}>
    <AttachmentList attachments={attachments} />
  </View>) :
  null
}

const MessageLink = props => {
  const { iconStyle, iconText, message } = props
  const { id, from, time, snippet, attachments, local, success, error } = message

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
  const [text] = snippet.split('--')

  const status = () => {
    let status = local && !success && MSG_SENDING
    if (error) {
      status = <Text style={style.error.inline}>{ERR_SEND_FAIL}</Text>
    }
    if (local && success) status = MSG_SENT
    return status
  }

  return (<View style={style.MessageLink} to={'/message/' + id}>
    <Avatar style={iconStyle} text={from}>
      <Text style={{
        ...styles.fontDefault,
        fontSize: 16,
        color: '#fff'
      }}>{iconSingleLetter}</Text>
    </Avatar>
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
        <Attachments attachments={attachments} />
      </View>
      <View>
        <Text style={style.messageTextTime}>{dateFormatted} {status()}</Text>
      </View>
    </View>
  </View>)
}

export default observer(MessageLink)