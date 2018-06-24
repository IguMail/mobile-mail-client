import React from 'react'
import { observer, inject } from 'mobx-react'
import { ScrollView } from 'react-native'
import { Section, InboxHeader, InboxFooter } from '../theme'
import inbox from '../theme/styles/inbox'
import Splash from './Splash'
import ThreadList from '../theme/Inbox/ThreadList'
import SearchBox from '../theme/SearchBox'
import ErrorModal from '../theme/ErrorModal'
import SideMenuLink from '../theme/SideMenuLink'

const debug = require('../lib/debug')('chaterr:Inbox')

const style = {
  ...inbox
}

@inject('getAccount', 'getThreads', 'sideMenu')
@observer
class Inbox extends React.Component {

  get accountId() {
    return this.props.getAccount.accountId
  }

  get profile() {
    return this.props.getAccount.profile
  }

  get account() {
    const { user } = this.profile
    debug('User account', user)
    if (!user) return {}
    return {
      email: user.email,
      displayName: Object.values(user.name).join(' ')
    }
  }

  get getThreads() {
    return this.props.getThreads(this.profile, this.id)
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

    debug('props', this.props)

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
    debug('sidemenu', this.props.sideMenu.isOpen)

    const sideMenuStateChange = isOpen => 
      this.props.sideMenu.isOpen = isOpen

    return (
      <SideMenuLink 
        account={this.props.getAccount}
        isOpen={this.props.sideMenu.isOpen} 
        onChange={isOpen => sideMenuStateChange(isOpen)}
      >
        <Section style={style.screen}>
          <ScrollView style={style.full}>
            <InboxHeader title={'All Priority'} />
            <SearchBox placeholder="Search" />
            <ThreadList updatedAt={updatedAt} threads={threads || {}} />
          </ScrollView>
          <InboxFooter />
        </Section>
      </SideMenuLink>
    )
  }
}

export default Inbox;