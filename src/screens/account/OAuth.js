import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { View } from 'react-native'
import config from '../../config'
import OAuth from '../../components/OAuth'
import Splash from '../../screens/Splash'

const debug = require('../../lib/debug')('chaterr:oauth')

const OAuthUrl = config.oauth.url + '/auth/{service}'

@inject('getAccount')
@observer
export default class AccountOAuth extends Component {

  state = {
    inProgress: true,
    succeeded: false,
    cancelled: false,
    error: null
  }

  get service() {
    return this.props.match.params.service
  }

  get Account() {
    return this.props.getAccount
  }

  isAuthComplete() {
    return !this.state.inProgress
  }

  onSuccess = params => {
    debug('onSuccess', params)
    this.setState({
      inProgress: false,
      succeeded: true
    })
    this.Account.setAccountId(params.email)
      .then(() => this.props.history.push('/'))
  }

  onError = error => {
    debug('onError', error)
    this.setState({
      inProgress: false,
      error: error
    })
    this.props.history.push('/account/add')
  }

  onCancel = status => {
    debug('onCancel', status)
    this.setState({
      inProgress: false,
      cancelled: true
    })
    this.props.history.push('/')
  }

  render() {

    // TODO: Show message
    if (this.isAuthComplete()) {
      return <Splash loaded={true} />
    }

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
    paddingTop: 30,
    backgroundColor: '#ecf0f1',
  },
  button: {
    marginVertical: 10,
  },
}