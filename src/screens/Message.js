import React from 'react'
import { observer, inject } from 'mobx-react'
import { View, Text, ScrollView, Modal, ActivityIndicator } from 'react-native'
import { Button } from 'react-native-elements'
import { Section, MessageHeader, MessageFooter } from '../theme'
import styles from '../theme/styles'
import conversation from '../theme/styles/conversation'
import Conversation from '../theme/Message/Conversation'
import FakeConversation from '../theme/Message/FakeConversation'

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

const ERR_HTTP_FAIL = 'Could not retrieve thread at this time'

@inject('getThread')
@observer
class Message extends React.Component {

  componentDidMount() {
    const messageId = this.props.match.params.id
    debug('Fetch message', messageId)
    this.fetchThread(messageId)
  }

  fetchThread(id) {
    return this.props.getThread(id).get()
  }

  render() {

    const id = this.props.match.params.id
    const { thread, loaded, error } = this.props.getThread(id)

    debug('Thread', thread)
    
    const closeErrorModal = event => {
      this.props.getThread.dismissError()
    }

    if (error) {
      setTimeout(() => closeErrorModal(), 5000)
      return <ErrorModal error={error} close={() => closeErrorModal()} />
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
        {loaded ? <Conversation messages={thread.messages || []} /> : <FakeConversation />}
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