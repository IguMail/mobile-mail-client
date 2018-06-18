import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { View } from 'react-native'
import { Constants, Linking, WebBrowser } from '../../lib/expo'
import config from '../../config'
import OAuth from '../../components/OAuth'

const debug = require('debug')('chaterr:oauth')

debug('{ Constants, Linking, WebBrowser }', { Constants, Linking, WebBrowser })

const OAuthUrl = config.oauth.url + '/auth/{service}'

@inject('getAccount')
@observer
export default class AccountOAuth extends Component {

  get service() {
    return this.props.match.params.service
  }

  get Account() {
    return this.props.getAccount
  }

  onSuccess = params => {
    debug('onSuccess', params)
    this.Account.setAccountId(params.email)
      .then(this.props.history.push('/'))
  }

  onFail = error => {
    debug('onFail', error)
    this.props.history.push('/account/add')
  }

  onCancel = status => {
    debug('onCancel', status)
    this.props.history.push('/')
  }

  render() {
    return (
      <View style={styles.container}>
        <OAuth 
          showDebug
          showAuthState
          autoOpen
          OAuthUrl={OAuthUrl} 
          service={this.service} 
          onSuccess={this.onSuccess} 
          onFail={this.onFail}
          onCancel={this.onCancel}
        />
      </View>
    )
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