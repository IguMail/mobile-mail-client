import React from "react"
import { View, Text, Image, TextInput, ScrollView } from "react-native"
import { Section, Row, InboxHeader, InboxFooter, TouchLink } from '../theme'
import styles from '../theme/styles'
import inbox from '../theme/styles/inbox'
import Splash from './Splash'
import MessageLink from '../theme/MessageLink'
import SearchBox from '../theme/SearchBox'
import sampleMessages from '../assets/sample/messages'
import Swipeout from 'react-native-swipeout'

const debug = require('debug')('chaterr:Inbox')

const style = {
  ...inbox,
  SwipeIconText: {
    // fontFamily: "Montserrat", // TODO: Add font
    fontSize: 10,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.36,
    textAlign: "center",
    color: "#3f8efc",
    marginTop: 9
  }
}

const MessagesList = props => {

  return <View style={style.MessageList}>
    {
      props.messages
      .map(
        (message, i) => {

          const { id, from, date, subject, priority } = message

          const deleteMessage = message => {
            debug('delete note', message)
          }
      
          const MoveIcon = () => (<TouchLink to="/" style={{
            ...styles.center,
            width: 90,
            flex: 1,
            borderRightColor: '#eee',
            borderRightWidth: 1
          }}>
            <Image source={require('../images/moveTo.png')} style={{
              width: 16,
              height: 16
            }} />
            <Text style={style.SwipeIconText}>Move To</Text>
          </TouchLink>)

          const SnoozeIcon = () => (<TouchLink to="/" style={{
            ...styles.center,
            width: 90,
            flex: 1,
            borderRightColor: '#eee',
            borderRightWidth: 1
          }}>
            <Image source={require('../images/clock.png')} style={{
              width: 16,
              height: 16
            }} />
            <Text style={style.SwipeIconText}>Snooze</Text>
          </TouchLink>)

          const LeftComponent = () => (
            <View style={{
              ...styles.center,
              width: 180,
              flex: 1,
              flexDirection: 'row',
              borderBottomColor: '#eee',
              borderBottomWidth: 1
            }}>
              <MoveIcon />
              <SnoozeIcon />
            </View>
          )
      
          const swipeBtns = [{
            component: <LeftComponent />,
            backgroundColor: 'transparent',
            underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
            onPress: () => deleteMessage(message)
          }]

          return (
            <Swipeout 
              key={id} 
              left={swipeBtns}
              autoClose={true}
              buttonWidth={180}
              backgroundColor= 'transparent'>
              <MessageLink 
                key={i} id={id} from={from[0].name} time={date} subject={subject} priority={priority} />
            </Swipeout>
          )

        })
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
      return new Promise(resolve => resolve(sampleMessages))
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