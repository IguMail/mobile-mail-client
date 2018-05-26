import React from 'react'
import { View, Text, Image, TextInput, ScrollView, Modal, ActivityIndicator } from 'react-native'
import { Button } from 'react-native-elements'
import { Section, MessageHeader, MessageFooter } from '../theme'
import styles from '../theme/styles'
import conversation from '../theme/styles/conversation'
import Conversation from '../theme/Message/Conversation'
import FakeConversation from '../theme/Message/FakeConversation'
import sampleThread from '../assets/sample/thread'
import MailApi from '../store/MailApi'
import config from '../config'

const debug = require('debug')('chaterr:Message')

const style = {
  ...conversation,
  ActivityIndicatorContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: '#fff',
    opacity: 0.5
  }
}

const mailApi = new MailApi('gabe@fijiwebdesign.com')
mailApi.setApiUrl(config.api.url)

const ERR_HTTP_FAIL = 'Could not retrieve thread at this time'

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
    return mailApi.thread(id)
      .fetch()
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

    if (!loaded) {
      return (<View  style={style.ActivityIndicatorContainer}>
        <ActivityIndicator />
      </View>)
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