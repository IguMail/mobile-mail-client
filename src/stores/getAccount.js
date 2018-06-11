import { observable } from 'mobx'
import MailApi from '../service/MailApi'
import config from '../config'
import createLocalStorage from '../service/LocalStorage'

const debug = require('debug')('chaterr:stores:getAccounts')

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

  constructor() {
    this.localStorage = createLocalStorage()
  }

  isLoggedIn() {
    return this.accountId && this.loaded 
      && (this.mainAccount && this.mainAccount.id)
  }

  setAccountId(accountId) {
    debug('Setting account id', accountId)
    this.accountId = accountId
    this.localStorage.set('accountId', accountId)
  }

  fetchAccountId() {
    return this.localStorage.get('accountId')
      .then(accountId => {
        debug('Fetch accountId', accountId)
        this.accountId = accountId
        return accountId
      })
      .catch(error => {
        debug('Fetch accountId error', error)
        this.error = error
      })
  }

  fetchAccount() {
    debug('Fetching account', this.accountId)
    if (!this.accountId) throw new Error('fetchAccountId before calling fetchAccount')
    return this.localStorage.get('account')
      .then(account => {
        debug('Fetched local account', this.accountId, account)
        if (!account) {
          debug('No local account, fetching from remote...', this.accountId)
          global.service = this.service
          return this.service.account(this.accountId)
            .fetch()
            .then(account => {
              setTimeout(() => this.loaded = true, 1)
              if (!account || !account.id) throw new Error('Account access failed')
              debug('Fetched remote account', account)
              this.mainAccount = account
            })
        }
        this.mainAccount = account
        this.loaded = true
      })
      .catch(error => {
        debug('Fetch account error', error)
        this.error = error
      })
  }

  fetch() {
    this.fetchAccountId()
      .then(accountId => {
        if (accountId) return this.fetchAccount()
        this.loaded = true
      })
      .catch(error => {
        this.error = error
        this.loaded = true
      })
  }

  dismissError() {
    this.error = null
  }
}
