import React from 'react'
import { autorun } from 'mobx'
import { observer, inject } from 'mobx-react'
import { KeyboardAvoidingView } from 'react-native'
import { Route, withRouter, Switch, Redirect } from 'react-router-native'
import Splash from './screens/Splash'
import Login from './screens/account/Login'
import LoginDev from './screens/account/LoginDev'
import AddAccount from './screens/account/Add'
import Inbox from './screens/Inbox'
import DevConsole from './screens/DevConsole'
import Message from './screens/Message'
import RegisterAccount from './screens/Register'
import Intro from './screens/Intro'

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
    const timer = setTimeout(() => this.accountFetchTimeout(), fetchTimeout)
    this.account.fetch()
      .then(res => clearTimeout(timer))
      .catch(err => clearTimeout(timer))

    autorun(() => {
      debug('autorun', this.account)
    })
  }

  accountFetchTimeout() {
    this.account.error = new Error(ERR_MSG_TIMEOUT)
    this.account.loaded = true
  }

  render() {
    const { loaded, location } = this.props

    debug('router props', this.props)
    debug('Account', this.account)

    const SplashRoute = props => (<Splash loaded={loaded} />)
    const DevConsoleRoute = withRouter(DevConsole)
    const LoginRoute = withRouter(Login)
    const LoginDevRoute = withRouter(LoginDev)
    const IntroRoute = withRouter(Intro)

    if (!this.account.loaded) {
      return <SplashRoute msg="Logging you in" />
    }

    if (!this.account.hasAccount()) {
      return <IntroRoute />
    }

    if (!this.account.isLoggedIn()) {
      return isDev ? <LoginDevRoute /> : <LoginRoute />
    }

    return (<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled="true">
      <Switch>
        <Route path="/splash" component={SplashRoute} />
        <Route path="/login" component={isDev ? LoginDevRoute : LoginRoute} />
        <Route path="/account/add" component={AddAccount} />
        <Route path="/account/register" component={RegisterAccount} />
        <Route path="/inbox" component={Inbox} />
        <Route path="/message/:id" component={Message} />
        <Route path="/intro" component={IntroRoute} />
        <Route path="/" component={DevConsoleRoute} />
      </Switch>
    </KeyboardAvoidingView>)
  }
}

export default AppRoutes