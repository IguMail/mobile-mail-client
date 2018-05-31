import React from "react"
import { Provider } from 'mobx-react'
import { NativeRouter, withRouter } from 'react-router-native'
import Splash from './screens/Splash'
import AppRoutes from './AppRoutes'
import stores from './stores'

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

    return (<Provider {...stores}>
      <NativeRouter>
        <Routes loaded={loaded} />
      </NativeRouter>
    </Provider>)
  }
}

export default App;
