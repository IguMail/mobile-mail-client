import React from 'react'
import { observer, inject } from 'mobx-react'
import { View } from 'react-native'
import OAuth from '../account/OAuth'
import config from '../../config'
import ErrorModal from '../../theme/ErrorModal'

const debug = require('../../lib/debug')('chaterr:add:oauth')

const OAuthUrl = config.oauth.url + '/auth/{service}'
const accountSuccessRoute = '/inbox'
const accountFailRoute = '/user/create'
const notificationTime = 3000
let timerRoute = null

// Note: We do not have an accountId at this point
// We observe getAccount only to set the accountId  
@inject('getAccount')
@observer
export default class CreateUserOAuth extends React.Component {

  state = {
    error: null
  }

  get service() {
    return this.props.match.params.service
  }

  get getAccount() {
    return this.props.getAccount
  }

  navigateToSuccessRoute() {
    debug('Navigating to ', accountSuccessRoute)
    this.props.history.push(accountSuccessRoute)
    this.getAccount.fetch()
  }

  getUserProfileFromOAuth(params) {
    debug('params', params)
    const user = JSON.parse(params.user)
    return user
  }

  onSuccess = params => {
    debug('onSuccess', params)
    this.setState({
      inProgress: false,
      succeeded: true,
      success: {
        message: 'user created successfully!'
      }
    })
    const profile = this.getUserProfileFromOAuth(params)
    this.getAccount
      .setUserProfile(profile)
      .then(profile => {
        return this.getAccount.setAccountId(profile.user.email)
      })
      .then(() => this.getAccount.created = profile)
      .then(() => {
        timerRoute = setTimeout(
          () => this.navigateToSuccessRoute(), 
          notificationTime
        )
      })
  }

  onError = error => {
    debug('onError', error)
    this.setState({
      inProgress: false,
      error: error
    })
    setTimeout(
      () => this.props.history.push(accountFailRoute), 
      notificationTime
    )
  }

  onCancel = status => {
    debug('onCancel', status)
    this.setState({
      inProgress: false,
      cancelled: true
    })
    setTimeout(
      () => this.props.history.push(accountFailRoute), 
      notificationTime
    )
  }
  
  render() {

    if (this.getAccount.error) {
      const close = () => this.getAccount.dismissError()
      return <ErrorModal isVisible={true} errorMsg={this.getAccount.error.message} close={close} />
    }

    if (this.state.error) {
      const close = () => this.setState({ error: null })
      return <ErrorModal isVisible={true} errorMsg={this.state.error.message} close={close} />
    }

    if (this.state.success) {
      const close = () => {
        clearTimeout(timerRoute)
        this.setState({ success: null })
        this.navigateToSuccessRoute()
      }
      return <ErrorModal isVisible={true} errorMsg={this.state.success.message} close={close} />
    }

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