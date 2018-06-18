import React from 'react'
import App from './src/App'
import { NativeRouter, withRouter } from 'react-router-native'

export default class AppNative extends React.Component {

  state = {
    loaded: false
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Lato': require('./src/assets/fonts/Lato-Regular.ttf'),
    })
    this.setState({
      loaded: true
    })
  }

  render() {
    return (<App loaded={this.state.loaded} Router={NativeRouter} withRouter={withRouter} />)
  }
}
