import React from 'react'
import { observer, inject } from 'mobx-react'
import { ScrollView } from 'react-native'
import { Section, InboxHeader, InboxFooter } from '../theme'
import styles from '../theme/styles'
import inbox from '../theme/styles/inbox'
import Splash from './Splash'
import ThreadList from '../theme/Inbox/ThreadList'
import SearchBox from '../theme/SearchBox'
import ErrorModal from '../theme/ErrorModal'

const debug = require('debug')('chaterr:Inbox')

const style = {
  ...inbox
}

@inject('getAccount', 'getThreads')
@observer
class Inbox extends React.Component {

  get accountId() {
    return this.props.getAccount.accountId
  }

  get account() {
    const { user } = this.props.getAccount.mainAccount
    debug('User account', user)
    if (!user) return {}
    return {
      email: user.email,
      displayName: Object.values(user.name).join(' ')
    }
  }

  get getThreads() {
    return this.props.getThreads(this.accountId, this.id)
  }

  componentDidMount() {
    debug('Fetching threads...')
    this.fetchThreads()
  }

  fetchThreads() {
    return this.getThreads.fetch()
  }

  render() {

    const { loaded, error, threads, updatedAt } = this.getThreads

    if (!loaded) {
      return <Splash loaded={true} />
    }

    if (error) {
      debug('Error', error)
      const closeModal = () => this.getThreads.dismissError()
      setTimeout(() => closeModal(), 5000)
      return <ErrorModal error={error} errorMsg={error.message} close={() => closeModal()} />
    }

    debug('threads', this.getThreads, threads, error)

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