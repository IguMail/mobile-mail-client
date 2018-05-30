import React from "react";
import { KeyboardAvoidingView } from "react-native";
import { Route, Redirect, Switch, withRouter } from 'react-router-native'
import Splash from './screens/Splash'
import Login from './screens/Login'
import AddAccount from './screens/account/Add'
import Inbox from './screens/Inbox'
import DevConsole from './screens/DevConsole'
import Message from './screens/Message'

const debug = require('debug')('chaterr:AppRoutes')

const AppRoutes = props => {

  const { loaded, location } = props

  debug('router props', props)

  const SplashRoute = props => (<Splash loaded={loaded} />)
  const DevConsoleRoute = withRouter(DevConsole)
  const MessageRoute = withRouter(Message)

  return (<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
    <Route path="/" component={SplashRoute} exact />  
    <Route path="/splash" component={SplashRoute} />
    <Route path="/login" component={Login} />
    <Route path="/account/add" component={AddAccount} />
    <Route path="/inbox" component={Inbox} />
    <Route path="/message/:id" component={MessageRoute} />
    <Switch>
      <Route path="/dev" component={DevConsoleRoute} />
      {location.pathname === '/' && <Redirect to='/dev' />}
    </Switch>
  </KeyboardAvoidingView>)
}

export default AppRoutes