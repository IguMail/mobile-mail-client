import React from "react"
import { View, Text, Image, TextInput, ScrollView } from "react-native"
import { Section, Row, InboxHeader, InboxFooter, TouchLink } from '../theme'
import styles from '../theme/styles'
import inbox from '../theme/styles/inbox'
import Splash from './Splash'
import MessageList from '../theme/Inbox/MessageList'
import SearchBox from '../theme/SearchBox'
import sampleMessages from '../assets/sample/messages'
import Swipeout from 'react-native-swipeout'

const debug = require('debug')('chaterr:Inbox')

let apiUrl = 'https://api.igumail.com'
if (process.env.NODE_ENV === 'development') {
  apiUrl = 'http://192.168.100.103:3030'
}

const style = {
  ...inbox
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
        debug('Error fetching messages', err)
        this.setState({ loaded: true })
      })
  }

  fetchMessages() {
    return fetch(apiUrl + '/account/mailsync2018@gmail.com/messages')
      .then(res => res.json())
      .catch(err => {
        // TODO: remove dev
        if (process.env.NODE_ENV === 'development') {
          return new Promise(resolve => resolve(sampleMessages))
        }
      })
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
        <MessageList messages={messages} />
      </ScrollView>
      <InboxFooter />
    </Section>)
  }
}

export default Inbox;