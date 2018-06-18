// required by MQTT.js
global.Buffer = require('buffer').Buffer
global.process = require('process')
global.process.type = 'renderer'

const EventEmitter = require('eventemitter2').EventEmitter2
const mqtt = require('mqtt/lib/connect/index.js')
const mqttTransport = require('../lib/mqtt/mqtt')
const config = require('../config').default
const debug = require('../lib/debug')('chaterr:mqttClient')

const MQTT_HOST = process.env.MQTT_HOST || config.mqtt.url

/**
 * MQTT Client Subscriber
 * Receive mail updates
 */
export default class MqttClient extends EventEmitter {

  Account = null
  mqtt = mqtt
  client = null
  transport = null
  channel = null
  mailbox = null

  lastSyncTime = 0
  
  options = {
    url: MQTT_HOST || 'mqtt://localhost:1883',
    syncInterval: 15000 // 15 secs
  }

  constructor(Account, options = {}) {
    super()
    if (!Account) throw new Error('Account parameter required')
    debug('new MqttClient', Account, options)
    this.Account = Account
    this.options = {
      ...this.options,
      ...options
    }
  }

  get connected() {
    return this.client && this.client.connected && !this.client.reconnecting
  }

  connect() {

    const { Account } = this

    const mqttOptions = {
      clientId: Account.id,
      username: Account.id,
      password: Account.user.xOAuth2Token
    }

    if (this.connected) {
      debug('Already connected to mqtt')
    } else {
      debug('Connecting to ', this.options.url, 'as', mqttOptions)
      this.client = this.mqtt.connect(this.options.url, mqttOptions)
      this.transport = new mqttTransport({
        id: 'channelId',
        client: this.client
      })
    }
    
    global.mqttClient = this // debugging

    if (!this.channel) {
      this.subscribe()
    }
    
    const lastSyncTimeElapsed = parseInt((new Date().getTime()) - this.lastSyncTime, 10)

    if (!this.mailbox || ( lastSyncTimeElapsed > this.opts.syncInterval )) {
      this.sync()
    }
    
  }

  subscribe() {

    const { transport, Account } = this
    const channelId = 'client/' + Account.id
    const channel = transport.channel(channelId)

    this.channel = channel

    debug('Subscribing to secure channels')

    channel.subscribe('imap/connected', () => {
      debug('connected to mail sync broker')
      this.emit('imap/connected')
    })
    channel.subscribe('imap/mailbox', mailbox => {
      debug('connected to mailbox', mailbox)
      this.emit('imap/mailbox', mailbox)
    })
    channel.subscribe('imap/error', message => {
      const { error } = message
      debug('Error occurred', error)
      if (error.textCode === 'AUTHENTICATIONFAILED') {
        debug('Re-Authentication required')
        this.emit('imap/error/auth', error)
      } else {
        this.emit('imap/error', error)
      }
    })
    channel.subscribe('mail/action', entry => {
      debug('mail action', entry)
      this.emit('mail/action', entry)
    })
    channel.subscribe('mail/saved', entry => {
      debug('mail saved', entry.id, entry.subject)
      this.emit('mail/saved', entry)
    })
    
  }

  sync() {
    debug('Sending sync request')
    const { channel, Account } = this
    channel.publish('imap/sync', { userId: Account.id })
    this.lastSyncTime = (new Date().getTime())
  }
}
