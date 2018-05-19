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

class App extends React.Component {

  componentDidMount() {
  }

  render() {

    const { loaded } = this.props

    const SplashRoute = props => (<Splash loaded={loaded} {...props} />)

    return (<NativeRouter>
      <View style={styles.main}>
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

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#fcfcfc"
  },
  title: {
    height: 155,
    backgroundColor: "#222",
    padding: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  titleText: {
    color: "#aaa"
  }
});

export default App;
