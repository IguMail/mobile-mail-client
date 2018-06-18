import React from "react"
import { Provider } from 'mobx-react'
import Splash from './screens/Splash'
import AppRoutes from './AppRoutes'
import stores from './stores'

const debug = require('./lib/debug')('chaterr:App')

class App extends React.Component {

  render() {

    const { loaded, Router, withRouter } = this.props
    debug('props', this.props)

    const SplashRoute = props => (<Splash loaded={loaded} />)

    if (!loaded) {
      return <SplashRoute />
    }

    const Routes = withRouter(AppRoutes)

    return (<Provider {...stores}>
      <Router>
        <Routes loaded={loaded} />
      </Router>
    </Provider>)
  }
}

export default App;
