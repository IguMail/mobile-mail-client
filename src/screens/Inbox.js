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
    const { user } = this.profile
    const username = user.userId || user.id // TODO: normalize
    const password = user.xOAuth2Token || user.password || user.pin || user.accessToken // TODO: normalize
    return this.props.getThreads(this.accountId, {
      username,
      password 
    })
  }

  componentDidMount() {
    debug('Fetching threads...')
    this.fetchThreads()
  }

  fetchThreads() {
    return this.getThreads.fetch()
  }

  renderError(error, close, timeout = 5000) {
    debug('Account Error', error)
    setTimeout(() => close(), timeout)
    return <ErrorModal 
      error={error} 
      errorMsg={error.message} 
      close={() => close()} 
    />
  }

  render() {

    const { loaded, error, threads, updatedAt } = this.getThreads
    const { getAccount } = this.props

    debug('props', this.props)

    if (!loaded) {
      return <Splash loaded={true} />
    }

    if (getAccount.error) {
      debug('Account Error', getAccount.error)
      return this.renderError(getAccount.error, () => getAccount.dismissError())
    }

    if (error) {
      debug('Threads Error', error)
      return this.renderError(error, () => this.getThreads.dismissError())
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