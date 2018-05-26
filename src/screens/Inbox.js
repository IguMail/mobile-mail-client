import React from "react"
import { View, Text, Image, TextInput, ScrollView } from "react-native"
import { Section, Row, InboxHeader, InboxFooter, TouchLink } from '../theme'
import styles from '../theme/styles'
import inbox from '../theme/styles/inbox'
import Splash from './Splash'
import ThreadList from '../theme/Inbox/ThreadList'
import SearchBox from '../theme/SearchBox'
import sampleThreads from '../assets/sample/threads'
import Swipeout from 'react-native-swipeout'
import MailApi from '../store/MailApi'
import config from '../config'

const debug = require('debug')('chaterr:Inbox')

const mailApi = new MailApi('gabe@fijiwebdesign.com')
mailApi.setApiUrl(config.api.url)

const style = {
  ...inbox
}

class Inbox extends React.Component {

  state = {
    threads: [],
    loaded: false
  }

  componentDidMount() {
    debug('Fetching threads')
    this.fetchThreads()
      .then(threads => {
        debug('got threads', threads)
        return this.setState({
          threads: threads.threads,
          loaded: true
        })
      })
      .catch(err => {
        debug('Error fetching threads', err)
        this.setState({ loaded: true })
      })
  }

  fetchThreads() {
    return mailApi.threads()
      .fetch()
      .catch(err => {
        // TODO: remove dev
        if (process.env.NODE_ENV === 'development') {
          return new Promise(resolve => resolve(sampleThreads))
        }
      })
  }

  render() {

    const { loaded, threads } = this.state

    if (!loaded) {
      return <Splash loaded={true} />
    }

    debug('threads', threads)

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
        <ThreadList threads={threads} />
      </ScrollView>
      <InboxFooter />
    </Section>)
  }
}

export default Inbox;