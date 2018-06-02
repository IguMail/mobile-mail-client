import { observable } from 'mobx'
import MailApi from '../service/MailApi'
import config from '../config'

const debug = require('debug')('chaterr:stores:sendMail')

const mailApi = new MailApi('gabe@fijiwebdesign.com')
mailApi.setApiUrl(config.api.url)

export default class SendMail {

  email
  @observable mail
  @observable error
  @observable sent
  @observable updatedAt
  @observable response

  constructor(email) {
    if (!email) {
      throw new Error('Email required')
    }
    this.email = email
  }

  send(mail) {
    return mailApi.sendMail(this.email, mail)
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
