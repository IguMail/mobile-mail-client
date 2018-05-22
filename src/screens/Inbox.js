import React from "react";
import { View, Text, Image } from "react-native";
import { Section, Row, InboxHeader, InboxFooter } from '../theme'
import styles from '../theme/styles'
import Splash from './Splash'
import sampleMessages from '../assets/sample.messages'

const style = {
  section: {
    marginTop: 0
  },
  dot: {
    width: 10,
    height: 10,
    backgroundColor: "#fc0a0a",
    borderRadius: 100
  },
  labelDot: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  MessageLink: {
    marginTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    width: '100%',
    alignItems: 'flex-start',
    paddingRight: 20,
    paddingLeft: 20,
    flexDirection: 'row'
  },
  messageTextContainer: {
    marginLeft: 13,
    flex: 1
  },
  messageTextHeader: {
    flexDirection: 'row'
  },
  messageTextFrom: {
    ...styles.fontDefault,
    fontWeight: "bold",
    color: "#333333"
  },
  messageTextTime: {
    ...styles.fontDefault,
    fontSize: 12,
    letterSpacing: 0.43,
    color: "#9aa7af"
  },
  messagetextSubject: {
    ...styles.fontDefault,
    fontSize: 12,
    lineHeight: 17,
    letterSpacing: 0.5,
    color: "#9aa7af",
    marginTop: 5.4
  }
}

const MessageIcon = props => (
  <View style={{
    width: 42,
    height: 42,
    backgroundColor: props.backgroundColor || "#95d7a2",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    ...props.style
  }}>
    {props.children}
  </View>
)

const MessageLink = props => {
  const { iconStyle, iconText, from, time, subject } = props
  return <Row style={style.MessageLink}>
    <MessageIcon style={iconStyle}>
      <Text style={{
        ...styles.fontDefault,
        fontSize: 16,
        color: '#fff'
      }}>{iconText || from && from[0]}</Text>
    </MessageIcon>
    <View style={style.messageTextContainer}>
      <View style={style.messageTextHeader}>
        <View style={{
          flex: 1
        }}>
          <Text style={style.messageTextFrom}>{from}</Text>
        </View>
        <View>
          <Text style={style.messageTextTime}>{time}</Text>
        </View>
      </View>
      <View>
        <Text style={style.messagetextSubject}>{subject}</Text>
        <View style={style.labelDot}>
          <View style={style.dot}></View>
        </View>
      </View>
    </View>
  </Row>
}

class Inbox extends React.Component {

  state = {
    messages: [],
    loaded: false
  }

  componentDidMount() {
    this.fetchMessages()
      .then(res => {
        console.log('Got resp', res.json())
        return res.json()
      })
      .then(messages => {
        console.log('got messages', messages)
        return this.setState({
          messages,
          loaded: true
        })
      })
      .catch(err => {
        console.log('Error fetching mail', err)
        this.setState({ loaded: true })
      })
  }

  fetchMessages() {
    return fetch('https://api.igumail.com/messages')
  }

  render() {

    const { loaded, messages } = this.state

    if (!loaded) {
      return <Splash />
    }

    console.log('messages', messages)

    // TODO remove dev only
    const displayMessages = messages.length > 1 ? messages : sampleMessages

    return (<Section style={{
      ...style.section,
      ...styles.center,
      justifyContent: 'flex-start'
    }}>

      <InboxHeader title={'All Priority'} />

      {
        (displayMessages)
          .map( ({ id, from, date, subject }) => {
            return <MessageLink key={id} from={from[0].name} time={date} subject={subject} />
          })
      }

      <InboxFooter />

    </Section>)
  }
}

export default Inbox;