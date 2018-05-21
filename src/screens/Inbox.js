import React from "react";
import { View, Text, Image } from "react-native";
import { Section, Row, InboxHeader, InboxFooter } from '../theme'
import styles from '../theme/styles'

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
    borderRadius: 100
  }}>
    {props.children}
  </View>
)

const MessageLink = (props) => (<Row style={style.MessageLink}>
    <MessageIcon>
      <Text style={{
        ...styles.fontDefault,
        fontSize: 16,
        color: '#fff'
      }}>J</Text>
    </MessageIcon>
    <View style={style.messageTextContainer}>
      <View style={style.messageTextHeader}>
        <View style={{
          flex: 1
        }}>
          <Text style={style.messageTextFrom}>Jasleen</Text>
        </View>
        <View>
          <Text style={style.messageTextTime}>14:15</Text>
        </View>
      </View>
      <View>
        <Text style={style.messagetextSubject}>Lorem ipsum dolor sit amet, consectetur</Text>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
          <View style={style.dot}></View>
        </View>
      </View>
    </View>
  </Row>)

class Inbox extends React.Component {

  render() {

    return (<Section style={{
      ...style.section,
      ...styles.center,
      justifyContent: 'flex-start'
    }}>

      <InboxHeader title={'All Priority'} />

      <MessageLink>
       
      </MessageLink>
      <MessageLink>
       
      </MessageLink>
      <MessageLink>
       
      </MessageLink>
      <MessageLink>
       
      </MessageLink>
      <MessageLink>
       
      </MessageLink>

      <InboxFooter />

    </Section>)
  }
}

export default Inbox;