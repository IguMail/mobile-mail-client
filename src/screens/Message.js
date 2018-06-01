import React from 'react'
import { autorun } from 'mobx'
import { observer, inject } from 'mobx-react'
import { View, ScrollView, ActivityIndicator, Alert } from 'react-native'
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

@inject('getThread', 'sendMail')
@observer
class Message extends React.Component {

  scrollView = null

  get id() {
    return this.props.match.params.id
  }

  get account() {
    // TODO: unmock
    return {
      email: 'gabe@fijiwebdesign.com',
      displayName: 'Gabe'
    }
  }

  get getThread() {
    return this.props.getThread(this.id)
  }

  get sendMail() {
    return this.props.sendMail(this.account.email)
  }

  getReplyTo(messages = []) {
    return messages && messages.length && messages[messages.length - 1].messageId
  }

  componentDidMount() {
    debug('Fetch message thread', this.id)
    this.getThread.get()
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

    debug('messages', messages, messages.length)

    // TODO: choose reply-to options
    const toAddresses = messages
      .map(message => message.from)
      .reduce((froms, value) => value.concat(froms), [])
    const to = toAddresses
      .filter((value, i, self) => self.indexOf(value) === i)

    if (!text) return

    let message = {
      messageId,
      to,
      subject,
      text,
      snippet: text,
      inReplyTo: this.getReplyTo(messages),
      date: new Date()
    }

    this.sendMail.send({
      mail: message // TODO: rename
    })
    .then(info => {
      debug('sendMail info', info)
      // TODO: Validate message sent on success
      // TODO: Watch conversation updates from store
    })

    message = {
      ...message,
      id: Math.random(),
      from: [{
        name: displayName,
        address: email
      }]
    }

    setTimeout(() => this.scrollView.scrollToEnd({animated: true}))

    // preload message
    this.getThread.messages = [
      ...messages,
      message
    ]

    debug('messages new', messages, messages.length)
    
  }

  render() {

    const thread = this.getThread
    const { subject, messages, loaded, error } = thread

    global.thread = thread

    debug('Thread', thread)
    
    const closeErrorModal = event => {
      thread.dismissError()
    }

    if (error) {
      setTimeout(() => closeErrorModal(), 5000)
      return <ErrorModal error={error} errorMsg={ERR_HTTP_FAIL} close={() => closeErrorModal()} />
    }

    if (!loaded) {
      return (<View  style={style.ActivityIndicatorContainer}>
        <ActivityIndicator />
      </View>)
    }

    if (this.sendMail.error) {
      Alert.alert(
        'Mail Error',
        'Failed to send your email. Please check your network connectivity.',
        [
          {text: 'Try Again', onPress: () => console.log('Ask me later pressed')},
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
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