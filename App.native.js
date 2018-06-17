import Expo, { Font, Linking, WebBrowser, Constants } from 'expo'
import { setExpo } from './src/lib/expo'
global.Expo = { Font, Linking, WebBrowser, Constants }
import React from 'react'
import App from './src/App'


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
    return (<App loaded={this.state.loaded} />)
  }
}
