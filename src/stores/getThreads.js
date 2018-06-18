import { observable } from 'mobx'
import { MqttClientFactory, MailApiFactory } from '../service'
import config from '../config'

const debug = require('../lib/debug')('chaterr:stores:getThreads')

export default class GetThreads {

  Account = null
  @observable threads = [{
    subject: '',
    messages: []
  }]
  @observable error
  @observable loaded
  @observable updatedAt

  get accountId() {
    return this.Account.account
  }

  /**
  * @param {Account} User Account
  **/
  constructor(Account) {
    if (!Account.id) {
      throw new Error('Account id required')
    }
    this.Account = Account
    global.getThreads = this // debugging
  }

  get service() {
    if (!this.accountId) throw new Error('User not logged in')
    return MailApiFactory(this.accountId, config.api)
  }

  get mqttClient() {
    if (!this.accountId) throw new Error('User not logged in')
    return MqttClientFactory(this.Account, config.mqtt)
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
