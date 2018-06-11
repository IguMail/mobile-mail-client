import { observable } from 'mobx'
import { MqttClientFactory, MailApiFactory } from '../service'
import config from '../config'

const debug = require('debug')('chaterr:stores:getThread')

export default class GetThread {
  
  id = null
  Account = null
  @observable subject = ''
  @observable messages = [{
    id: null,
    messageId: null,
    subject: null,
    local: null,
    success: null,
    error: null
  }]
  @observable authError = null
  @observable error = null
  @observable loaded = false

  mqttConnected = false
  mqttInboxConnected = false

  get accountId() {
    return this.Account.account
  }

  /**
  * @param {accountId} User Account Id
  * @param {id} Thread message id
  **/
  constructor(Account, id) {
    if (!Account.id) {
      throw new Error('Account id required')
    }
    if (!id) {
      throw new Error('Thread message id required')
    }
    this.Account = Account
    this.id = id
    global.getThread = this // debugging
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
    debug('Fetching thread', this.id)
    return this.service
      .thread(this.id)
      .fetch()
      .then(thread => {
        if (thread.error) {
          throw new Error(thread.error)
        }
        debug('Got thread', thread)
        this.addAttachmentUrls(thread.messages)
        this.messages = thread.messages
          //.forEach(message => this.addMessage(message))
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

  sync() {
    const client = this.mqttClient
    client.on('imap', () => {
      this.mqttConnected = true
    })
    client.on('imap/connected', mailbox => {
      this.mqttInboxConnected = true
    })
    client.on('imap/error', error => {
      debug('imap/error', error)
      this.error = new Error(error)
    })
    client.on('imap/error/auth', error => {
      debug('imap/error/auth', error)
      this.authError = new Error(error)
    })
    client.on('mail/action', entry => {
      this.fetch()
    })
    client.on('mail/saved', entry => {
      this.fetch()
    })
    return client.connect()
  }

  lastMessage() {
    return this.messages 
      && this.messages[this.messages.length - 1]
  }

  getMessageIndex(message) {
    return [...this.messages.keys()]
      .find(i => this.messages[i].id === message.id)
  }

  replaceMessage(message) {
    var index = this.getMessageIndex(message)
    debug('replace index', index)
    if (index !== undefined) {
      this.messages[index] = message
      this.messages = this.messages.toJS() // TODO: Fix this
    }
  }

  addMessage(message) {
    var index = this.getMessageIndex(message)
    debug('add message', index, message.id)
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
          attachment.url = this.service.attachment(attachment.id).request.url.href
        })
      }
    })
  }
}
