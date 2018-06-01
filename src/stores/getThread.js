import { observable } from 'mobx'
import MailApi from '../service/MailApi'
import config from '../config'

const debug = require('debug')('chaterr:stores:getThread')

const mailApi = new MailApi('gabe@fijiwebdesign.com')
mailApi.setApiUrl(config.api.url)

export default class GetThread {
  
  id
  @observable subject = ''
  @observable messages = []
  @observable error = null
  @observable loaded = false

  /**
  * @param {id} Thread message id
  **/
  constructor(id: string) {
    if (!id) {
      throw new Error('Thread message id required')
    }
    this.id = id
  }

  async get() {
    debug('Fetching thread', this.id)
    return mailApi.thread(this.id)
      .fetch()
      .then(thread => {
        debug('Got thread', thread)
        this.addAttachmentUrls(thread.messages)
        this.messages = thread.messages
        this.subject = thread.subject
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
    return [...this.messages].pop()
  }

  addMessage(message) {
    this.messages.push(message)
  }

  dismissError() {
    this.error = null
  }

  // TODO: move to server
  addAttachmentUrls(messages) {
    messages.forEach(message => {
      if (message.attachments) {
        message.attachments.forEach(attachment => {
          attachment.url = mailApi.attachment(attachment.id).request.url.href
        })
      }
    })
  }
}
