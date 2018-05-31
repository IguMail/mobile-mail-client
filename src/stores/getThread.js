import { observable } from 'mobx'
import MailApi from '../service/MailApi'
import config from '../config'
import sampleThread from '../assets/sample/thread'

const debug = require('debug')('chaterr:stores:getThread')

const mailApi = new MailApi('gabe@fijiwebdesign.com')
mailApi.setApiUrl(config.api.url)

export default class GetThread {
  
  id
  @observable thread = {
    subject: '',
    messages: []
  }
  @observable error;
  @observable loaded

  constructor(id: string) {
    this.id = id
  }

  async get() {
    if (!this.id) {
      this.thread = {
        subject: '',
        messages: []
      };
      return;
    }
    return mailApi.thread(this.id)
      .fetch()
      .then(thread => {
        debug('Thread', thread)
        this.addAttachmentUrls(thread)
        this.thread = thread
        this.loaded = true
        return thread
      })
      .catch(error => {
        // TODO: remove dev
        debug('error', error)
        this.error = error
        this.loaded = true
      })
  }

  lastMessage() {
    return [...this.thread.messages].pop()
  }

  addMessage(message) {
    this.thread.messages.push(message)
  }

  dismissError() {
    this.error = null
  }

  // TODO: move to server
  addAttachmentUrls(thread) {
    thread.messages.forEach(message => {
      if (message.attachments) {
        message.attachments.forEach(attachment => {
          attachment.url = mailApi.attachment(attachment.id).request.url.href
        })
      }
    })
  }
}
