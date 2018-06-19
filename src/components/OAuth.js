import React from 'react'
import { View } from 'react-native'
import { Text, Button } from 'react-native-elements'
import { Linking, WebBrowser } from '../lib/expo'

const debug = require('../lib/debug')('chaterr:com:oauth')

debug('{ Linking, WebBrowser }', { Linking, WebBrowser })

export default class OAuth extends React.Component {

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
    browserState: {},
    error: null
  }

  unmounting = false

  get service() {
    return this.props.service || 'google'
  }

  get OAuthUrl() {
    return this.props.OAuthUrl
  }

  get Account() {
    return this.props.getAccount
  }

  componentDidMount() {
    debug('Linking', Linking)
    Linking.getInitialURL().then(url => {
      this._onOpenedWithUrl(url, 'initial')
    })
  }

  componentWillUnmount() {
    this.unmounting = true
  }

  parseUrl(url) {
    url = url.replace(/#$/, '') // fix Expo.Linking.parse bug
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
    }

    if (params.queryParams && params.queryParams.userId) {
      if (this.props.onSuccess) {
        this.props.onSuccess(params.queryParams)
      }
    } else if (this.props.autoOpen) {
      this._openWebBrowser()
    }
      
  }

  _onCancel = () => {
    if (this.props.onCancel) {
      this.props.onCancel(this.state.browserState)
    }
  }

  render() {
    const { showDebug, showAuthState, containerStyle } = this.props
    const { opener, browserState } = this.state
    const params = opener.params.queryParams

    const userId = params && params.userId

    const oAuthDone = opener.type === 'return' || (params  && params.userId) || browserState.type === 'cancel'
    const btnTitle = oAuthDone ? 'Re-Login with Google' : 'Login with Google'

    debug('State', this.state)

    const AuthState = () => (
      <View style={styles.authState}>
        {oAuthDone && userId && <Text h1>Login Success</Text>}
        {oAuthDone && !userId && <Text h1>Login Failed</Text>}
        <Button
          title={btnTitle}
          onPress={this._openWebBrowser}
          style={styles.button}
        />
        <Button
          title={'Cancel'}
          onPress={this._onCancel}
          style={styles.button}
        />
      </View>
    )

    const Debug = () => (
      <View>
        <Text>{'Service: ' + JSON.stringify({ service: this.service })}</Text>
        <Text>{'Params: ' + JSON.stringify(params)}</Text>
      </View>
    )

    return (
      <View style={[styles.container, containerStyle]}>
        
        {showDebug && <Debug />}
        {showAuthState && <AuthState />}
        {this.props.children}
        
      </View>
    )
  }

  _makeReturnUrl() {
    const service = this.service
    return Linking.makeUrl('/account/oauth/google', {
      service,
      time: (new Date()).getTime()
    })
  }
  
  _openWebBrowser = () => {
    const returnUrl = this._makeReturnUrl()
    this.setState({
      returnUrl
    })
    Linking.addEventListener('url', ({ url }) => this._onOpenedWithUrl(url, 'return'))
    debug('returnUrl', returnUrl)
    const url = this.OAuthUrl.replace('{service}', this.service)
    return this._openUrl(url + '?returnUrl=' + encodeURIComponent(returnUrl))
  }

  _openUrl(url) {
    debug('Opening URL', url)
    
    WebBrowser.openAuthSessionAsync(url)
      .then(browserState => {
        debug('WebBrowser opened, browserState', browserState)
        if (this.unmounting) return
        this.setState({
          browserState
        })
        if (browserState && browserState.type === 'cancel' && this.props.onCancel) {
          this.props.onCancel(new Error(browserState))
        }
      })
      .catch(error => {
        if (this.unmounting) return
        this.setState({
          error
        })
        if (this.props.onError) {
          this.props.onError(error)
        }
      })
  }
  
}

const styles = {
  container: {},
  authState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginVertical: 10,
  },
}