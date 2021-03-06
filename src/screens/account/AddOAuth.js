import React from 'react'
import { observer, inject } from 'mobx-react'
import { View } from 'react-native'
import OAuth from './OAuth'
import config from '../../config'

const debug = require('../../lib/debug')('igumail:add:oauth')

const OAuthUrl = config.oauth.url + '/auth/{service}'

@inject('getAccount')
@observer
export default class AddAccountOAuth extends React.Component {

  onSuccess = params => {
    debug('onSuccess', params)
    this.setState({
      inProgress: false,
      succeeded: true
    })
    this.props.history.push('/inbox')
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
    const { accountId } = this.props.getAccount
    debug('OAuth for account Id', accountId)
    return (
      <View>
        <OAuth 
          accountId={accountId}
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
