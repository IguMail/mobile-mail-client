import { observable, autorun } from 'mobx'
import MailApi from '../service/MailApi'
import config from '../config'
import sampleThread from '../assets/sample/threads'

const debug = require('debug')('chaterr:stores:getThreads')

const mailApi = new MailApi('gabe@fijiwebdesign.com')
mailApi.setApiUrl(config.api.url)

export default class GetThreads {

  threads = [{
    subject: '',
    messages: []
  }]
  @observable error
  @observable loaded
  @observable updatedAt

  constructor() {
    autorun(() => {
      debug("Threads:", this.threads
        .map((thread, i) => `${i} (${thread.messages.length})\n`)
        .join(", ")
      );
    })
  }

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
