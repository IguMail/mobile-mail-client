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

  fetch() {
    debug('Fetching thread', this.id)
    return mailApi.thread(this.id)
      .fetch()
      .then(thread => {
        debug('Got thread', thread)
        this.addAttachmentUrls(thread.messages)
        thread.messages
          .forEach(message => this.addMessage(message))
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
    return this.messages 
      && this.messages[this.messages.length - 1]
  }

  getMessageIndex(message) {
    return [...this.messages.keys()]
      .find(i => this.messages[i].messageId === message.messageId)
  }

  replaceMessage(message) {
    var index = this.getMessageIndex(message)
    debug('replace index', index)
    if (index !== undefined) {
      this.messages[index] = message
    }
  }

  addMessage(message) {
    var index = this.getMessageIndex(message)
    debug('add index', index)
    if (index !== undefined) {
      return this.replaceMessage(message)
    }
    this.messages = [
      ...this.messages,
      message
    ]
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
