import React from 'react'
import { autorun } from 'mobx'
import { observer, inject } from 'mobx-react'
import { View, ScrollView, ActivityIndicator } from 'react-native'
import { Section, MessageHeader, MessageFooter } from '../theme'
import styles from '../theme/styles'
import conversation from '../theme/styles/conversation'
import Conversation from '../theme/Message/Conversation'
import ErrorModal from '../theme/ErrorModal'
import utils from '../lib/utils'

const debug = require('../lib/debug')('chaterr:Message')

const style = {
  ...conversation
}

const CHECK_NETWORK = 'Please check your network connection.'
const ERR_HTTP_FAIL = 'Could not retrieve thread at this time. ' + CHECK_NETWORK
const ERR_SEND_FAIL = 'Failed to send your email. ' + CHECK_NETWORK
const ERR_AUTH_FAIL = 'Failed to log you into your Chaterr account. Please log in again.'

@inject('getAccount', 'getThread', 'sendMail')
@observer
class Message extends React.Component {

  scrollView = null

  get threadId() {
    return this.props.match.params.id
  }

  get accountId() {
    return this.getAccount.accountId
  }

  get profile() {
    return this.getAccount.profile
  }

  get getAccount() {
    const getAccount = this.props.getAccount
    debug('getAccount', getAccount)
    return getAccount
  }

  get getThread() {
    debug('get Thread', this.profile, this.threadId)
    const { user } = this.profile
    const username = this.profile.id || this.accountId // TODO: normalize
    const password = user.xOAuth2Token || user.password || user.pin || user.accessToken // TODO: normalize
    return this.props.getThread(this.accountId, {
      username,
      password 
    }, this.threadId)
  }

  get sendMail() {
    return this.props.sendMail(this.accountId, this.getAccount.email)
  }

  getReplyTo(messages = []) {
    return messages && messages.length && messages[messages.length - 1].messageId
  }

  componentDidMount() {
    this.getThread.fetch()
    setTimeout(() => this.getThread.sync(), 1)
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
    const { name, email } = this.getAccount
    let { subject, messages } = this.getThread
    const messageId = this.generateMessageId()

    debug('messages', messages.toJSON(), messages.length)

    const getAllAddresses = messages => messages
      .map(message => message.from)
      .reduce((froms, value) => value.concat(froms), [])

    const getUniqueAddresses = addresses => {
      const list = addresses.map(address => address.address)
      const uniqueList = [...new Set(list)]
      const uniqueAddresses = uniqueList.map( 
        (address, i, self) => addresses[list.indexOf(address)]
      )
      return uniqueAddresses
    }

    // TODO: choose reply-to options
    const addresses = getAllAddresses(messages)
    const to = getUniqueAddresses(addresses)

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
        name,
        address: email
      }],
      local: true,
      success: false,
      error: null
    }

    this.sendMail.send(email, message)
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
    }, 50)

    // preload message
    this.getThread.addMessage(message)
    debug('messages new', messages.toJSON(), messages.length)
    
  }

  render() {

    const getThread = this.getThread
    const { subject, messages, loaded, error, authError } = getThread

    global.getThread = getThread

    debug('getThread', utils.clone(getThread))

    if (authError) {
      const closeModal = () => {
        this.props.history.push('/login')
        getThread.dismissError()
      }
      setTimeout(() => closeModal(), 5000)
      return <ErrorModal error={error} errorMsg={ERR_AUTH_FAIL} close={() => closeModal()} />
    }

    if (error) {
      const closeModal = () => getThread.dismissError()
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