import React, { Component } from 'react'
import { View } from 'react-native'
import OAuth from '../../components/OAuth'
import Splash from '../../screens/Splash'

const debug = require('../../lib/debug')('igumail:oauth')

export default class AccountOAuth extends Component {

  state = {
    inProgress: true,
    succeeded: false,
    cancelled: false,
    error: null
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
    this.props.onSuccess(params)
  }

  onError = error => {
    debug('onError', error)
    this.setState({
      inProgress: false,
      error: error
    })
    this.props.onError(error)
  }

  onCancel = status => {
    debug('onCancel', status)
    this.setState({
      inProgress: false,
      cancelled: true
    })
    this.props.onCancel(status)
  }

  render() {

    if (this.isAuthComplete()) {
      return <Splash loaded={true} />
    }

    return (
      <View style={styles.container}>
        <OAuth 
          accountId={this.props.accountId}
          showDebug
          showAuthState
          autoOpen
          OAuthUrl={this.props.OAuthUrl} 
          service={this.props.service} 
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
