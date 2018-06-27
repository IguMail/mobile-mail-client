import { observable } from 'mobx'
import { MailApiFactory } from '../service'
import config from '../config'

const debug = require('../lib/debug')('chaterr:stores:sendMail')

export default class SendMail {

  accountId = null

  @observable mail
  @observable error
  @observable sent
  @observable updatedAt
  @observable response

  get email() {
    // TODO: choose email account
    return this.Account.account
  }

  /**
  * @param {Account} User Account
  **/
  constructor(accountId) {
    if (!accountId) {
      throw new Error('Account id required')
    }
    this.accountId = accountId
    global.sendMail = this // debugging
  }

  get service() {
    if (!this.accountId) throw new Error('User not logged in')
    return MailApiFactory(this.accountId, config.api)
  }

  send(mail) {
    return this.service.sendMail(this.email, mail)
      .fetch()
      .then(info => {
        if (info.error) {
          throw new Error(info.error)
        }
        this.info = info
        this.sent = true
        this.updatedAt = (new Date()).getTime()
        return info
      })
      .catch(error => {
        // TODO: retry
        debug('error', error)
        this.error = error
        this.sent = true
        return { error }
      })
  }

  dismissError() {
    this.error = null
  }

}
