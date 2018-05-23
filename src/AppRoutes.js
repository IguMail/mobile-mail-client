import React from "react";
import { View, Text } from "react-native";
import { Route, Redirect, Switch, Link, withRouter } from 'react-router-native'
import Splash from './screens/Splash'
import Login from './screens/Login'
import AddAccount from './screens/account/Add'
import Inbox from './screens/Inbox'
import styles from './theme/styles'
import TouchLink from './theme/TouchLink'
import DevConsole from './screens/DevConsole'
import Message from './screens/Message'

const debug = require('debug')('chaterr:AppRoutes')

const AppRoutes = props => {

  const { loaded, location } = props

  debug('router props', props)

  const isDev = process.env.NODE_ENV === 'development'
  let path = '/'

  const SplashRoute = props => (<Splash loaded={loaded} />)
  const DevConsoleRoute = withRouter(DevConsole)
  const MessageRoute = withRouter(Message)

  return (<View style={{ flex: 1 }}>
    <Route path="/" component={SplashRoute} exact />  
    <Route path="/splash" component={SplashRoute} />
    <Route path="/login" component={Login} />
    <Route path="/account/add" component={AddAccount} />
    <Route path="/inbox" component={Inbox} />
    <Route path="/message/:id" component={MessageRoute} />
    <Switch>
      <Route path="/dev" component={DevConsoleRoute} />
      {location.pathname == '/' && <Redirect to='/dev' />}
    </Switch>
  </View>)
}

export default AppRoutes