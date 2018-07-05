import React from 'react'
import { autorun } from 'mobx'
import { observer, inject } from 'mobx-react'
import { Route, withRouter, Switch } from 'react-router-native'
import Splash from './screens/Splash'
import Login from './screens/account/Login'
import LoginDev from './screens/account/LoginDev'
import AddAccount from './screens/account/Add'
import Inbox from './screens/Inbox'
import DevConsole from './screens/DevConsole'
import Message from './screens/Message'
import Intro from './screens/Intro'
import ResetAccount from './screens/ResetAccount'
import RegisterAccount from './screens/user/Register'
import utils from './lib/utils'

const debug = require('./lib/debug')('chaterr:AppRoutes')
const isDev = process.env.NODE_ENV === 'development'
const fetchTimeout = 5000

const ERR_MSG_TIMEOUT = 'Timeout when logging in. Check your network connection.'

@inject('getAccount')
@observer
class AppRoutes extends React.Component {

  get account() {
    return this.props.getAccount
  }

  componentDidMount() {
    this.fetchAccount()
    autorun(() => {
      debug('autorun', utils.clone(this.account))
    })
  }

  fetchAccount() {
    const timer = setTimeout(() => this.accountFetchTimeout(), fetchTimeout)
    return this.account
      .fetch()
      .catch(err => {
        debug('Error fetching profile', err) // TODO
      })
      .finally(res => clearTimeout(timer))
  }

  accountFetchTimeout() {
    this.account.error = new Error(ERR_MSG_TIMEOUT)
    this.account.loaded = true
  }

  render() {
    const { loaded } = this.props

    debug('router props', this.props)
    debug('Account', utils.clone(this.account))

    const SplashRoute = () => (<Splash loaded={loaded} />)
    const DevConsoleRoute = withRouter(DevConsole)
    const LoginRoute = withRouter(Login)
    const LoginDevRoute = withRouter(LoginDev)
    const IntroRoute = withRouter(Intro)
    const ResetAccountRoute = withRouter(ResetAccount)

    if (!loaded || !this.account.loaded || this.account.fetching) {
      return <SplashRoute msg="Logging you in" />
    }

    if (!this.account.hasAccount()) {
      return <IntroRoute />
    }

    if (!this.account.isLoggedIn()) {
      //return isDev ? <LoginDevRoute /> : <LoginRoute />
    }

    return (
      <Switch>
        <Route path="/splash" component={SplashRoute} />
        <Route path="/reset" component={ResetAccountRoute} />
        <Route path="/login" component={isDev ? LoginDevRoute : LoginRoute} />
        <Route path="/account/add" component={AddAccount} />
        <Route path="/user/create" component={RegisterAccount} />
        <Route path="/inbox" component={Inbox} />
        <Route path="/message/:id" component={Message} />
        <Route path="/intro" component={IntroRoute} />
        <Route path="/" component={DevConsoleRoute} />
      </Switch>
    )
  }
}

export default AppRoutes