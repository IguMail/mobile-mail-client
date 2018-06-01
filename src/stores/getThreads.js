import { observable } from 'mobx'
import MailApi from '../service/MailApi'
import config from '../config'

const debug = require('debug')('chaterr:stores:getThreads')

const mailApi = new MailApi('gabe@fijiwebdesign.com')
mailApi.setApiUrl(config.api.url)

export default class GetThreads {

  @observable threads = [{
    subject: '',
    messages: []
  }]
  @observable error
  @observable loaded
  @observable updatedAt

  get() {
    return mailApi.threads()
      .fetch()
      .then(threads => {
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
