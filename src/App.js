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
import Auth from './Auth'
import Splash from './Splash'
import styles from './theme/styles'

class App extends React.Component {

  render() {

    const { loaded } = this.props

    const SplashRoute = props => (<Splash loaded={loaded} {...props} />)

    return (<NativeRouter>
      <View style={styles.center}>
        <Route path="/" component={SplashRoute} exact />
        <Route path="/auth" component={Auth}/>
        <RedirectToApp />
      </View>
    </NativeRouter>)
  }
}

const RedirectToApp = withRouter(
  ({history}) => {
    //setTimeout(() => history.push('/auth'), 2000)
    return null
  }
)

export default App;
