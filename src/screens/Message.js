import React from 'react'
import { autorun } from 'mobx'
import { observer, inject } from 'mobx-react'
import { View, ScrollView, ActivityIndicator } from 'react-native'
import { Section, MessageHeader, MessageFooter } from '../theme'
import styles from '../theme/styles'
import conversation from '../theme/styles/conversation'
import Conversation from '../theme/Message/Conversation'
import ErrorModal from '../theme/ErrorModal'

const debug = require('debug')('chaterr:Message')

const style = {
  ...conversation
}

const ERR_HTTP_FAIL = 'Could not retrieve thread at this time'
const ERR_SEND_FAIL = 'Failed to send your email. Please check your network connectivity.'

@inject('getAccount', 'getThread', 'sendMail')
@observer
class Message extends React.Component {

  scrollView = null

  get id() {
    return this.props.match.params.id
  }

  get accountId() {
    return this.getAccount.accountId
  }

  get account() {
    const { user } = this.getAccount.mainAccount
    if (!user) return {}
    return {
      email: user.email,
      displayName: Object.values(user.name).join(' ')
    }
  }

  get getAccount() {
    const getAccount = this.props.getAccount
    debug('getAccount', getAccount)
    return getAccount
  }

  get getThread() {
    debug('get Thread', this.accountId, this.id)
    return this.props.getThread(this.accountId, this.id)
  }

  get sendMail() {
    return this.props.sendMail(this.accountId, this.account.email)
  }

  getReplyTo(messages = []) {
    return messages && messages.length && messages[messages.length - 1].messageId
  }

  componentDidMount() {
    this.getThread.fetch()
    autorun(() => {
      debug('autorun', this.getThread)
    })
  }

  generateMessageId() {
    return Math.random() // TODO: proper uid
  }

  onSubmitEditing(text) {
    debug('onSubmitMessage', text)
    // TODO: send the email
    const { displayName, email } = this.account
    let { subject, messages } = this.getThread
    const messageId = this.generateMessageId()

    debug('messages', messages.toJSON(), messages.length)

    // TODO: choose reply-to options
    const toAddresses = messages
      .map(message => message.from)
      .reduce((froms, value) => value.concat(froms), [])
    const to = toAddresses
      .filter((value, i, self) => self.indexOf(value) === i)

    if (!text) return

    let message = {
      id: messageId,
      messageId,
      to,
      subject,
      text,
      snippet: text,
      inReplyTo: this.getReplyTo(messages),
      date: new Date(),
      from: [{
        name: displayName,
        address: email
      }],
      local: true,
      success: false,
      error: null
    }

    this.sendMail.send(message)
    .then(info => {
      debug('sendMail info', info)
      if (info.error) {
        throw new Error(info.error)
      }
      this.getThread.replaceMessage({
        ...message,
        error: null,
        success: true
      })
    })
    .catch(error => {
      debug('sendMail error', error)
      this.getThread.replaceMessage({
        ...message,
        error: new Error('Failed to send message'),
        success: false
      })
    })

    // TODO: listen for event rather than setTimeout
    setTimeout(() => {
      this.scrollView && this.scrollView.scrollToEnd({animated: true})
    })

    // preload message
    this.getThread.addMessage(message)
    debug('messages new', messages.toJSON(), messages.length)
    
  }

  render() {

    const thread = this.getThread
    const { subject, messages, loaded, error } = thread

    global.thread = thread

    debug('Thread', thread)

    if (error) {
      const closeModal = () => thread.dismissError()
      setTimeout(() => closeModal(), 5000)
      return <ErrorModal error={error} errorMsg={ERR_HTTP_FAIL} close={() => closeModal()} />
    }

    if (!loaded) {
      return (<View  style={style.ActivityIndicatorContainer}>
        <ActivityIndicator />
      </View>)
    }

    if (this.sendMail.error) {
      const closeModal = () => this.sendMail.dismissError()
      setTimeout(() => closeModal(), 5000)
      return <ErrorModal errorMsg={ERR_SEND_FAIL} close={() => closeModal()} />
    }

    return (<Section style={{
      ...style.screen,
      ...styles.center,
      justifyContent: 'flex-start',
      flex: 1
    }}>
      <ScrollView 
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: "#f7f8f9"
        }}
        ref={ref => this.scrollView = ref}
      >
        <MessageHeader title={subject} />
        <Conversation messages={messages} />
      </ScrollView>
      <MessageFooter onSubmitEditing={text => this.onSubmitEditing(text)} />
    </Section>)
  }
}

export default Message;