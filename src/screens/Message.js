import React from "react"
import { View, Text, Image, TextInput, 
  ScrollView, WebView, ActivityIndicator, Modal } from "react-native"
import { Button } from 'react-native-elements'
import { Section, Row, MessageHeader, MessageFooter, MenuIcon, TouchLink } from '../theme'
import styles from '../theme/styles'
import conversation from '../theme/styles/conversation'
import FakeMessage from '../theme/Message/FakeMessage'
import MessageLink from '../theme/Message/MessageLink'
import SearchBox from '../theme/SearchBox'
import sampleThread from '../assets/sample/thread'
import Swipeout from 'react-native-swipeout'

const debug = require('debug')('chaterr:Message')

const style = {
  ...conversation
}

let apiUrl = 'https://api.igumail.com'
if (process.env.NODE_ENV === 'development') {
  apiUrl = 'http://192.168.100.102:3030'
}

const ERR_HTTP_FAIL = 'Could not retrieve thread at this time'

const Conversation = props => {

  const { messages } = props

  debug('threading conversation', messages)

  const MessageList = () => messages.map(message => {
    const { id, from, snippet, date } = message

    const deleteMessage = message => {
      debug('delete note', message)
    }

    const MoveIcon = () => (<TouchLink to="/">
      <Image source={require('../images/search.png')} style={{
        width: 16,
        height: 16
      }} />
    </TouchLink>)

    const swipeBtns = [{
      component: <MoveIcon />,
      backgroundColor: 'red',
      underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
      onPress: () => deleteMessage(message)
    }]

    return (
      <Swipeout 
        key={id} 
        left={swipeBtns}
        autoClose={true}
        backgroundColor= 'transparent'>
        <MessageLink {...message} from={from[0].name} time={date} />
      </Swipeout>
    )
  })

  return <View style={style.MessageList}>
    <MessageList />
  </View>
}

const FakeConversation = props => (
  <View style={style.MessageList}>
    <FakeMessage />
    <View><ActivityIndicator /></View>
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
    this.fetchThread(messageId)
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

  fetchThread(id) {
    return fetch(apiUrl + '/account/mailsync2018@gmail.com/thread/07b7ac52-0287-4119-8752-e00f3b89ec56')
      .then(res => res.json())
      .catch(error => {
        this.setState({
          error
        })
        // TODO: remove dev
        if (process.env.NODE_ENV === 'development') {
          return new Promise(resolve => resolve(sampleThread))
        }
      })
  }

  render() {

    const { loaded, thread, error } = this.state

    debug('thread', thread)

    if (error) {
      const close = () => this.setState({ error: null })
      setTimeout(() => close(), 1000)
      return <ErrorModal error={error} close={() => close()} />
    }

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
        {loaded ? <Conversation messages={thread.messages} /> : <FakeConversation />}
      </ScrollView>
      <MessageFooter />
    </Section>)
  }
}

const ErrorModal = props => (<Modal
  style={{
    ...styles.center
  }}
  animationType="slide"
  transparent={false}
  visible={true}>
  <View style={{padding: 50}}>
    <View>
      <Text style={{ padding: 20 }}>{props.error.message}</Text>
      <Button
        title="Close"
        buttonStyle={styles.btnPrimary}
        onPress={props.close}
      />
    </View>
  </View>
</Modal>)

export default Message;