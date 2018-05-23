import React from "react";
import { View, Text } from "react-native";
import { NativeRouter, Route, Redirect, Switch, Link, withRouter } from 'react-router-native'
import Splash from './screens/Splash'
import AppRoutes from './AppRoutes'
import styles from './theme/styles'

const debug = require('debug')('chaterr:App')

class App extends React.Component {

  render() {

    const { loaded } = this.props
    debug('props', this.props)

    const SplashRoute = props => (<Splash loaded={loaded} />)

    if (!loaded) {
      return <SplashRoute />
    }

    const Routes = withRouter(AppRoutes)

    return (<NativeRouter>
      <Routes loaded={loaded} />
    </NativeRouter>)
  }
}

export default App;
