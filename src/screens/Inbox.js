import React from "react"
import { View, Text, Image, TextInput, ScrollView } from "react-native"
import { Section, Row, InboxHeader, InboxFooter, TouchLink } from '../theme'
import styles from '../theme/styles'
import inbox from '../theme/styles/inbox'
import Splash from './Splash'
import MessageLink from '../theme/MessageLink'
import SearchBox from '../theme/SearchBox'
import sampleMessages from '../assets/sample.messages'

const debug = require('debug')('chaterr:Inbox')

const style = {
  ...inbox
}

const MessagesList = props => {
  return <View style={style.MessageList}>
    {
      props.messages
      .map(
        ({ id, from, date, subject, priority }, i) =>
        <MessageLink 
          key={i} id={id} from={from[0].name} time={date} subject={subject} priority={priority} />)
    }
  </View>
}

class Inbox extends React.Component {

  state = {
    messages: [],
    loaded: false
  }

  componentDidMount() {
    this.fetchMessages()
      .then(messages => {
        debug('got messages', messages)
        return this.setState({
          messages,
          loaded: true
        })
      })
      .catch(err => {
        debug('Error fetching mail', err)
        this.setState({ loaded: true })
      })
  }

  fetchMessages() {
    // TODO: remove dev
    if (process.env.NODE_ENV === 'development') {
      return new Promise(resolve => resolve([...sampleMessages, ...sampleMessages]))
    }
    // TODO: use service
    return fetch('https://api.igumail.com/messages')
      .then(res => res.json())
  }

  render() {

    const { loaded, messages } = this.state

    if (!loaded) {
      return <Splash loaded={true} />
    }

    debug('messages', messages)

    return (<Section style={{
      ...style.screen,
      ...styles.center,
      justifyContent: 'flex-start',
      flex: 1
    }}>
      <ScrollView style={{
        width: '100%'
      }}>
        <InboxHeader title={'All Priority'} />
        <SearchBox placeholder="Search" />
        <MessagesList messages={messages} />
      </ScrollView>
      <InboxFooter />
    </Section>)
  }
}

export default Inbox;