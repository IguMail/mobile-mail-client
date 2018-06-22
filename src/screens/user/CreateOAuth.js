import React from 'react'
import { observer, inject } from 'mobx-react'
import { View } from 'react-native'
import OAuth from '../account/OAuth'
import config from '../../config'

const debug = require('../../lib/debug')('chaterr:add:oauth')

const OAuthUrl = config.oauth.url + '/auth/{service}'

@inject('getAccount')
@observer
export default class CreateUserOAuth extends React.Component {

  get service() {
    return this.props.match.params.service
  }

  get Account() {
    return this.props.getAccount
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
    this.props.history.push('/user/create')
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

    return (
      <View>
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