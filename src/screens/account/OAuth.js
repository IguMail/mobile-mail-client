import React, { Component } from 'react'
import { Button, View } from 'react-native'
import { Text } from 'react-native-elements'
import { Constants, Linking, WebBrowser } from '../../lib/expo'
import config from '../../config'

const debug = require('debug')('chaterr:oauth')

debug('{ Constants, Linking, WebBrowser }', { Constants, Linking, WebBrowser })

const OAuthUrl = config.oauth.url + '/auth/{service}'

export default class App extends Component {

  state = {
    opener: {
      url: null,
      type: null,
      params: {
        path: null,
        queryParams: {}
      }
    },
    returnUrl: null,
    browserState: {}
  }

  get service() {
    return this.props.match.params.service
  }

  componentDidMount() {
    debug('Linking', Linking)
    Linking.getInitialURL().then(url => {
      this._onOpenedWithUrl(url, 'initial')
    })
  }

  parseUrl(url) {
    return Linking.parse(url)
  }

  _onOpenedWithUrl(url, type) {
    const params = this.parseUrl(url)
    debug('Opened with URL', url, type, params)
    this.setState({
      opener: {
        url,
        type,
        params
      }
    })
    if (type === 'return') {
      WebBrowser.dismissBrowser()
      if (this.props.onSuccess) this.props.onSuccess(params.queryParams)
    }
    else this._openWithWebBrowser()
  }

  render() {
    const params = this.state.opener.params.queryParams
    return (
      <View style={styles.container}>
        <Text>{'Service: ' + JSON.stringify({ service: this.service })}</Text>
        <Text>{'Params: ' + JSON.stringify(params)}</Text>

        {params.userId && <Text h1>Login Success</Text>}
        {!params.userId && <Text h1>Login Failed</Text>}
        <Button
          title="Re-Login with Google"
          onPress={this._openWithWebBrowser}
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
  
  _openWithWebBrowser = () => {
    const returnUrl = this._makeReturnUrl()
    this.setState({
      returnUrl
    })
    Linking.addEventListener('url', ({ url }) => this._onOpenedWithUrl(url, 'return'))
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

const styles = {
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
}