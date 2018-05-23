import React from "react"
import { View, Text, Image, TextInput, ScrollView, WebView } from "react-native"
import { Section, Row, MessageHeader, MessageFooter } from '../theme'
import styles from '../theme/styles'
import conversation from '../theme/styles/conversation'
import FakeMessage from '../theme/Message/FakeMessage'
import MessageLink from '../theme/Message/MessageLink'
import SearchBox from '../theme/SearchBox'
import sampleThread from '../assets/sample.messages'

const debug = require('debug')('chaterr:Message')

const style = {
  ...conversation
}

const ERR_HTTP_FAIL = 'Could not retrieve thread at this time'

const Conversation = props => {

  const { thread } = props

  debug('threading conversation', thread)

  const messages = thread.map(message => {
    let { id, from, mail, date } = message
    mail = {
      html: message.subject
    }
    return <MessageLink key={id} {...message} from={from[0].name} time={date} mail={mail} />
  })

  return <View style={style.MessageList}>{messages}</View>
  
}

const FakeConversation = props => (
  <View style={style.MessageList}>
    <FakeMessage />
  </View>
)

class Message extends React.Component {

  state = {
    messages: [],
    loaded: false,
    error: false
  }

  componentDidMount() {
    const messageId = this.props.match.params.id
    debug('Fetch message', this.props.match.params.id)
    this.fetchMessage(messageId)
      .then(thread => {
        debug('got thread', thread)
        return this.setState({
          thread,
          loaded: true
        })
      })
      .catch(err => {
        debug('Error fetching mail', err)
        this.setState({ error: new Error(ERR_HTTP_FAIL) })
      })
  }

  fetchMessage(id) {
    return fetch('https://api.igumail.com/thread/' + id)
      .then(res => res.json())
      .catch(() => {
        // TODO: remove dev
        if (process.env.NODE_ENV === 'development') {
          return new Promise(resolve => resolve(sampleThread))
        }
      })
  }

  render() {

    const { loaded, thread } = this.state

    debug('thread', thread)

    return (<Section style={{
      ...style.screen,
      ...styles.center,
      justifyContent: 'flex-start',
      flex: 1
    }}>
      <ScrollView style={{
        width: '100%',
        height: '100%',
        backgroundColor: "#f7f8f9"
      }}>
        <MessageHeader title={loaded ? thread.subject : ''} />
        {loaded ? <Conversation thread={thread} /> : <FakeConversation />}
      </ScrollView>
      <MessageFooter />
    </Section>)
  }
}

export default Message;