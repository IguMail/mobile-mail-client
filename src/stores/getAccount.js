import { observable } from 'mobx'
import MailApi from '../service/MailApi'
import config from '../config'
import createLocalStorage from '../service/LocalStorage'

const debug = require('../lib/debug')('chaterr:stores:getAccounts')

export default class GetAccount {

  @observable accountId = null
  @observable profile = {}
  @observable accounts = []
  @observable error = null
  @observable loaded = false
  @observable loggedIn = false

  get service() {
    if (!this.accountId) throw new Error('Account Id is not set')
    return new MailApi(this.accountId, config.api)
  }

  get name() {
    const { name } = this.profile.user
    return name.givenName + (name.familyName && ' ' + name.familyName)
  }

  get email() {
    return this.profile.user.email
  }

  get photo() {
    try {
      return this.profile.user.photos[0].value
    } catch(e) {}
  }

  get status() {
    return 'Online' // TODO
  }

  constructor() {
    this.localStorage = createLocalStorage()
    global.getAccount = this // debugging
  }

  reset() {
    this.loaded = false
    this.profile = {}
    this.accounts = []
    this.error = null
    this.loggedIn = false
  }

  hasAccount() {
    if (!this.loaded) throw new Error('Account not loaded yet')
    return !!this.accountId
  }

  isLoggedIn() {
    return this.accountId && this.loaded 
      && (this.profile && this.profile.id)
  }

  setAccountId(accountId) {
    debug('Setting account id', accountId)
    if (this.accountId === accountId) return Promise.resolve(accountId)
    this.reset()
    return this.localStorage.set('accountId', accountId)
      .then(() => this.accountId = accountId)
      .then(() => this.fetchUserProfile())
      .then(() => this.accountId)
  }

  getUserProfile() {
    debug('Getting user local profile')
    return this.localStorage.get('profile')
  }

  setUserProfile(entry) {
    debug('Setting user profile', entry)
    return this.localStorage.set('profile', entry)
      .then(() => {
        this.profile = entry
        return entry
      })
  }

  createUserProfile(entry) {
    debug('Creating user profile', entry)
    return this.service.createUserProfile(entry)
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

  fetchUserProfile() {
    debug('Fetching profile', this.accountId)
    if (!this.accountId) {
      throw new Error('AccountId must be set before fetching profile')
    }
    return this.getUserProfile()
      .then(profile => {
        debug('Fetched local profile', this.accountId, profile)
        if (!profile || profile.account !== this.accountId) {
          debug('Stale local profile, fetching from remote', this.accountId)
          return this.service.profile(this.accountId)
            .fetch()
        }
        return profile
      })
      .then(profile => {
        if (!profile || !profile.account) {
          throw new Error('Failed to retrieve profile')
        }
        return this.setUserProfile(profile)
      })
      .catch(error => {
        debug('Fetch profile error', error)
        this.error = error
      })
      .finally(() => this.loaded = true)
  }

  fetchMailAccounts() {
    return this.service.accounts()
      .fetch()
      .then(accounts => {
        if (!accounts) throw new Error('Failed to fetch accounts')
        this.accounts = accounts
      })
  }

  fetch() {
    return this.fetchAccountId()
      .then(accountId => {
        if (accountId) return this.fetchUserProfile()
      })
      .catch(error => {
        this.error = error
      })
      .finally(() => this.loaded = true)
  }

  addMailAccount(entry) {
    debug('Creating mail account', entry)
    return this.service.addMailAccount(entry)
      .fetch()
      .then( ({entry}) => {
        debug('Created mail account entry', entry)
        if (!entry || !entry.id) {
          throw new Error('Failed to create mail account entry', entry)
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
