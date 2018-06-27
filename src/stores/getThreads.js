import { observable } from 'mobx'
import { MqttClientFactory, MailApiFactory } from '../service'
import config from '../config'

const debug = require('../lib/debug')('chaterr:stores:getThreads')

export default class GetThreads {

  accountId = null
  auth = null
  @observable threads = [{
    subject: '',
    messages: []
  }]
  @observable error
  @observable loaded
  @observable updatedAt

  /**
  * @param {auth} { username, password } Password can be password hash or xOAuthToken
  **/
  constructor(accountId, auth) {
    debug('accountId, auth', accountId, auth)
    if (!accountId || !auth) {
      throw new Error('accountId and auth arguments required')
    }
    this.accountId = accountId
    this.auth = auth
    global.getThreads = this // debugging
  }

  get service() {
    if (!this.accountId) throw new Error('User not logged in')
    return MailApiFactory(this.accountId, config.api)
  }

  get mqttClient() {
    if (!this.accountId) throw new Error('User not logged in')
    return MqttClientFactory(this.auth, config.mqtt)
  }

  fetch() {
    return this.service.threads()
      .fetch()
      .then(threads => {
        if (!threads || threads.length > 0) throw new Error('Could not get threads') 
        debug('got threads', threads)
        if (threads.error) {
          throw new Error('Unable to retrieve threads')
        }
        this.threads = threads.threads
        this.loaded = true
        this.updatedAt = (new Date()).getTime()
        return this.threads
      })
      .catch(error => {
        // TODO: remove dev
        debug('error', error)
        this.error = error
        this.loaded = true
      })
  }

  sync() {
    const client = this.mqttClient

    debug('sync connecting mqtt client', client)
    return client.connect()
  }

  dismissError() {
    this.error = null
  }

}
