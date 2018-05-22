import React from "react"
import { View, Text, Image, TextInput } from "react-native"
import { Section, Row, InboxHeader, InboxFooter } from '../theme'
import styles from '../theme/styles'
import inbox from '../theme/styles/inbox'
import Splash from './Splash'
import MessageLink from '../theme/MessageLink'
import SearchBox from '../theme/SearchBox'
import sampleMessages from '../assets/sample.messages'
import { FormInput } from "react-native-elements"

const debug = require('debug')('chaterr:Inbox')

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
      .then(res => {
        debug('Got resp', res.json())
        return res.json()
      })
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
    return fetch('https://api.igumail.com/messages')
  }

  render() {

    const { loaded, messages } = this.state

    if (!loaded) {
      return <Splash loaded={true} />
    }

    debug('messages', messages)

    // TODO remove dev only
    const displayMessages = messages.length > 1 ? messages : sampleMessages

    return (<Section style={{
      ...style.section,
      ...styles.center,
      justifyContent: 'flex-start'
    }}>
      <InboxHeader title={'All Priority'} />
      <SearchBox placeholder="Search" />
      {
        (displayMessages)
          .map( ({ id, from, date, subject, priority }) => {
            return <MessageLink 
              key={id} from={from[0].name} time={date} subject={subject} priority={priority} />
          })
      }
      <InboxFooter />
    </Section>)
  }
}

export default Inbox;