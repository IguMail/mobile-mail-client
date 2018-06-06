import React from 'react'
import { autorun } from 'mobx'
import { observer, inject } from 'mobx-react'
import { KeyboardAvoidingView } from 'react-native'
import { Route, Redirect, Switch, withRouter } from 'react-router-native'
import Splash from './screens/Splash'
import Login from './screens/Login'
import LoginDev from './screens/LoginDev'
import AddAccount from './screens/account/Add'
import Inbox from './screens/Inbox'
import DevConsole from './screens/DevConsole'
import Message from './screens/Message'

const debug = require('debug')('chaterr:AppRoutes')
const isDev = process.env.NODE_ENV === 'development'

@inject('getAccount')
@observer
class AppRoutes extends React.Component {

  get account() {
    return this.props.getAccount
  }

  componentDidMount() {
    this.account.fetch()
    autorun(() => {
      debug('autorun', this.account)
    })
  }

  render() {
    const { loaded, location } = this.props

    debug('router props', this.props)
    debug('Account', this.account)

    const SplashRoute = props => (<Splash loaded={loaded} />)
    const DevConsoleRoute = withRouter(DevConsole)
    const LoginRoute = withRouter(Login)
    const LoginDevRoute = withRouter(LoginDev)

    if (!this.account.loaded) {
      return <SplashRoute />
    }

    if (location.pathname !== '/account/add' && !this.account.isLoggedIn()) {
      const onAccountId = accountId => {
        debug('Received Account Id', accountId)
        this.account.setAccountId(accountId)
      }
      return isDev ? 
        <LoginDevRoute onAccountId={accountId => onAccountId(accountId)} /> : 
        <LoginRoute onAccountId={accountId => onAccountId(accountId)} />
    }

    return (<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled="enabled">
      <Route path="/" component={SplashRoute} exact />  
      <Route path="/splash" component={SplashRoute} />
      <Route path="/login" component={isDev ? LoginDevRoute : LoginRoute} />
      <Route path="/account/add" component={AddAccount} />
      <Route path="/inbox" component={Inbox} />
      <Route path="/message/:id" component={Message} />
      <Switch>
        <Route path="/dev" component={DevConsoleRoute} />
        {location.pathname === '/' && <Redirect to='/dev' />}
      </Switch>
    </KeyboardAvoidingView>)
  }
}

export default AppRoutes