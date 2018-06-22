import { observable } from 'mobx'
import MailApi from '../service/MailApi'
import config from '../config'
import createLocalStorage from '../service/LocalStorage'

const debug = require('../lib/debug')('chaterr:stores:getAccounts')

export default class GetAccount {

  @observable accountId = null
  @observable mainAccount = {}
  @observable accounts = []
  @observable error = null
  @observable loaded = false
  @observable loggedIn = false

  get service() {
    if (!this.accountId) throw new Error('Account Id is not set')
    return new MailApi(this.accountId, config.api)
  }

  get name() {
    const { name } = this.mainAccount.user
    return name.givenName + (name.familyName && ' ' + name.familyName)
  }

  get email() {
    return this.mainAccount.user.email
  }

  get photo() {
    try {
      return this.mainAccount.user.photos[0].value
    } catch(e) {}
  }

  get status() {
    return 'Online' // TODO
  }

  constructor() {
    this.localStorage = createLocalStorage()
    global.getAccount = this // debugging
  }

  isLoggedIn() {
    return this.accountId && this.loaded 
      && (this.mainAccount && this.mainAccount.id)
  }

  setAccountId(accountId) {
    debug('Setting account id', accountId)
    if (this.accountId === accountId) return Promise.resolve(accountId)
    this.clearAccount()
    return this.localStorage.set('accountId', accountId)
      .then(() => this.accountId = accountId)
      .then(() => this.fetchAccount())
      .then(() => this.accountId)
  }

  fetchAccountId() {
    return this.localStorage.get('accountId')
      .then(accountId => {
        debug('Fetch accountId', accountId)
        return this.setAccountId(accountId)
      })
      .catch(error => {
        debug('Fetch accountId error', error)
        this.error = error
      })
  }

  clearAccount() {
    this.loaded = false
    this.mainAccount = {}
  }

  fetchAccount() {
    debug('Fetching account', this.accountId)
    if (!this.accountId) throw new Error('Account does not exist')
    return this.localStorage.get('account')
      .then(account => {
        debug('Fetched local account', this.accountId, account)
        if (!account) {
          debug('No local account, fetching from remote', this.accountId)
          return this.service.account(this.accountId)
            .fetch()
        }
        return account
      })
      .then(account => {
        if (!account || !account.id) throw new Error('Failed to retrieve account')
        this.mainAccount = account
      })
      .catch(error => {
        debug('Fetch account error', error)
        this.error = error
      })
      .finally(() => this.loaded = true)
  }

  fetch() {
    return this.fetchAccountId()
      .then(accountId => {
        if (accountId) return this.fetchAccount()
      })
      .catch(error => {
        this.error = error
      })
      .finally(() => this.loaded = true)
  }

  createAccount(entry) {
    debug('Creating account', entry)
    return this.service.createAccount(entry)
      .fetch()
      .then( ({entry}) => {
        debug('Created account entry', entry)
        if (!entry || !entry.id) {
          throw new Error('Failed to create account entry', entry)
        }
        return entry
      })
      .catch(error => {
        this.error = error
      })
      .finally(result => {
        return result
      })
  }

  dismissError() {
    this.error = null
  }
}
