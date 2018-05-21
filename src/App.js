// @flow
import * as React from "react";
import { View } from "react-native";
import { NativeRouter, Route, Redirect, Switch } from 'react-router-native'
import Splash from './screens/Splash'
import Login from './screens/Login'
import AddAccount from './screens/account/Add'
import Inbox from './screens/Inbox'
import styles from './theme/styles'

class App extends React.Component {

  state = {
    redirect: false
  }

  currentScreen = '/'

  componentDidMount() {
    setTimeout(() => this.setState({ redirect: '/inbox' }), 200)
  }

  redirect() {
    const redirect = this.state.redirect
    if (redirect) {
      return (<Redirect to={redirect} />)
    }
    return null
  }

  render() {

    const { loaded } = this.props

    console.log('props', this.props)

    const SplashRoute = props => (<Splash loaded={loaded} {...props} />)

    return (<NativeRouter>
      <View style={{ flex: 1 }}>
        <Route path="/" component={SplashRoute} exact />
        <Route path="/login" component={Login}/>
        <Route path="/account/add" component={AddAccount}/>
        <Switch>
        <Route path="/inbox" component={Inbox}/>
          {this.redirect()}
        </Switch>
      </View>
    </NativeRouter>)
  }
}

export default App;
