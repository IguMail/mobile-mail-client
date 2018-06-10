import { observable } from 'mobx'
import MailApi from '../service/MailApi'
import config from '../config'

const debug = require('debug')('chaterr:stores:getThreads')

export default class GetThreads {

  @observable threads = [{
    subject: '',
    messages: []
  }]
  @observable error
  @observable loaded
  @observable updatedAt

  /**
  * @param {accountId} User Account Id
  **/
  constructor(accountId) {
    if (!accountId) {
      throw new Error('Account id required')
    }
    this.accountId = accountId
    global.getThreads = this // debugging
  }

  get service() {
    if (!this.accountId) throw new Error('User not logged in')
    if (!this._service) {
      this._service = new MailApi(this.accountId)
      this._service.setApiUrl(config.api.url)
    }
    return this._service
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

  dismissError() {
    this.error = null
  }

}
