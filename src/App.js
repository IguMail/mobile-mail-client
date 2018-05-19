// @flow
import * as React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  StatusBar,
  View
} from "react-native";
import { Header, Text } from "react-native-elements";
import { NativeRouter, Route, Link, Redirect, withRouter } from 'react-router-native'
import Login from './screens/Login'
import Splash from './Splash'
import styles from './theme/styles'

class App extends React.Component {

  render() {

    const { loaded } = this.props

    const SplashRoute = props => (<Splash loaded={loaded} {...props} />)

    return (<NativeRouter>
      <View style={styles.center}>
        <Route path="/" component={SplashRoute} exact />
        <Route path="/login" component={Login}/>
        <RedirectToApp />
      </View>
    </NativeRouter>)
  }
}

// TODO: remove this
let redirected = false
const RedirectToApp = withRouter(
  ({history}) => {
    if (!redirected) {
      console.log('Redirecting to login...')
      setTimeout(() => history.push('/login'), 200)
      redirected = true
    }
    return null
  }
)

export default App;
