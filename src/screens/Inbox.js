import React from 'react'
import { observer, inject } from 'mobx-react'
import { ScrollView } from 'react-native'
import { Section, InboxHeader, InboxFooter } from '../theme'
import styles from '../theme/styles'
import inbox from '../theme/styles/inbox'
import Splash from './Splash'
import ThreadList from '../theme/Inbox/ThreadList'
import SearchBox from '../theme/SearchBox'

const debug = require('debug')('chaterr:Inbox')

const style = {
  ...inbox
}

@inject('getThreads')
@observer
class Inbox extends React.Component {

  componentDidMount() {
    debug('Fetching threads...')
    this.fetchThreads()
  }

  fetchThreads() {
    return this.props.getThreads.get()
  }

  render() {

    const { loaded, error, threads, updatedAt } = this.props.getThreads

    if (!loaded) {
      return <Splash loaded={true} />
    }

    if (error) {
      // TODO: handle
      debug('handle error', error)
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
        <ThreadList updatedAt={updatedAt} threads={threads || {}} />
      </ScrollView>
      <InboxFooter />
    </Section>)
  }
}

export default Inbox;