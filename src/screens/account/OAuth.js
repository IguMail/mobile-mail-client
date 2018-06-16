import React, { Component } from 'react'
import { Button, View, StyleSheet, Text } from 'react-native'
import url, { URLSearchParams } from 'url'
import { Constants, Linking, WebBrowser } from 'expo'
import config from '../../config'

const debug = require('debug')('chaterr:oauth')

debug('{ Constants, Linking, WebBrowser }', { Constants, Linking, WebBrowser })

const OAuthUrl = config.oauth.url + '/auth/{service}'

export default class App extends Component {

  state = {
    opener: {
      url: null,
      type: null
    },
    returnUrl: null,
    browserState: {}
  }

  componentDidMount() {
    debug('Linking', Linking)
    Linking.getInitialURL().then(url => {
      this._onOpenedWithUrl(url, 'initial')
    })
  }

  _onOpenedWithUrl(url, type) {
    const params = Linking.parse(url)
    //Linking.parseInitialURLAsync(url)
    debug('Opened with URL', url, type, params)
    this.setState({
      opener: {
        url,
        type,
        params
      }
    })
    WebBrowser.dismissBrowser()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{'Debug: ' + JSON.stringify({ state: this.state, OAuthUrl })}</Text>
        
        <Button
          title="Login with Google"
          onPress={this._handleOpenWithWebBrowser}
          style={styles.button}
        />
      </View>
    )
  }

  _makeReturnUrl() {
    return Linking.makeUrl('/auth', {
      service: 'google',
      time: (new Date()).getTime()
    })
  }
  
  _handleOpenWithWebBrowser = () => {
    const returnUrl = this._makeReturnUrl()
    this.setState({
      returnUrl
    })
    Linking.addEventListener('url', url => this._onOpenedWithUrl(url, 'return'))
    debug('returnUrl', returnUrl)
    const service = 'google'
    const url = OAuthUrl.replace('{service}', service)
    return this._openUrl(url + '?returnUrl=' + encodeURIComponent(returnUrl))
  }

  _openUrl(url) {
    debug('Opening URL', url)
    
    WebBrowser.openAuthSessionAsync(url)
      .then(browserState => {
        this.setState({
          browserState
        })
      })
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30 || Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  button: {
    marginVertical: 10,
  },
})