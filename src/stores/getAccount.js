import { observable } from 'mobx'
import MailApi from '../service/MailApi'
import config from '../config'
import createLocalStorage from '../service/LocalStorage'

const debug = require('../lib/debug')('igumail:stores:getAccounts')

export default class GetAccount {

  @observable accountId = null
  @observable profile = {}
  @observable accounts = []
  @observable error = null
  @observable loaded = false
  @observable loadedProfile = false
  @observable loggedIn = false
  @observable fetching = false
  @observable created = null
  @observable added = null

  get service() {
    if (!this.accountId) throw new Error('Account Id is not set')
    return new MailApi(this.accountId, config.api)
  }

  get name() {
    return this.profile.fullName
  }

  get email() {
    return this.profile.email
  }

  get photo() {
    return this.profile.photo
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

  hasProfile() {
    if (!this.loaded) throw new Error('Account not loaded yet')
    return this.profile && this.profile.account
  }

  hasRemoteAccount() {
    if (!this.loaded) throw new Error('Account not loaded yet')
    return this.profile && this.profile.source === 'remote'
  }

  isLoggedIn() {
    return this.accountId && this.loaded 
      && (this.profile && this.profile.account)
  }

  setAccountId(accountId) {
    debug('Setting account id', accountId)
    if (this.accountId === accountId) return Promise.resolve(accountId)
    this.reset()
    return this.localStorage.set('accountId', accountId)
      .then(() => {
        this.accountId = accountId
        return accountId
      })
      .catch(error => {
        this.error = error
        throw error
      })
  }

  getUserProfile() {
    debug('Getting user local profile')
    return this.localStorage.get('profile')
  }

  /**
    * @param entry = {
      account: accountId
      user: {
        fullName,
        email,
        photo,
      }
    }
   */
  setUserProfile(entry) {
    debug('Setting user profile', entry)

    if (entry.user.provider === 'google') {
      entry = this.normalizeGoogleProfile(entry)
    }
    // TODO: other providers

    return this.localStorage.set('profile', entry)
      .then(() => {
        this.profile = entry
        return entry
      })
  }

  /**
    * @param entry = {
        name,
        phone, 
        pin,
      }
   */
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
        throw error
      })
      .finally(result => {
        return result
      })
  }

  /**
    * 
    * @param entry = {
        name,
        email, 
        password, 
        imap { host, port, protocol }, 
        imap { host, port, protocol }
      }
    */
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
        throw error
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
        throw error
      })
  }

  fetchUserProfile() {
    debug('Fetching profile', this.accountId)
    if (!this.accountId) {
      throw new Error('AccountId must be set before fetching profile')
    }
    this.loadedProfile = false
    return this.service.profile()
      .fetch()
      .then(profile => {
        if (!profile || !profile.user) {
          debug('No remote profile, fetching from local', profile)
          return this.getUserProfile()
            .then(profile => {
              if (!profile) {
                throw new Error('Could not retrieve profile')
              }
              profile.source = 'local'
              debug('Fetched local profile', this.accountId, profile)
              return profile
            })
        }
        profile.source = 'remote'
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
      .finally(() => this.loadedProfile = true)
  }

  normalizeGoogleProfile(profile) {
    debug('Normalize google profile', profile)
    const { name, email } = profile.user
    const fullName = name.givenName + (name.familyName && ' ' + name.familyName)
    const photo = profile.user.photos[0].value
    const normalized = {
      ...profile,
      fullName,
      photo,
      email
    }
    debug('Normalized google profile', normalized)
    return normalized
  }

  fetchMailAccounts() {
    return this.service.accounts()
      .fetch()
      .then(accounts => {
        if (!accounts) throw new Error('Failed to fetch accounts')
        this.accounts = accounts
      })
      .catch(error => {
        debug('fetchMailAccounts error', error)
        this.error = error
        throw error
      })
  }

  fetch() {
    if (this.fetching) return
    this.reset()
    return this.fetchAccountId()
      .then(accountId => {
        if (accountId) {
          return this.fetchUserProfile()
        } else {
          debug('no account')
        }
      })
      .catch(error => {
        this.error = error
        throw error
      })
      .finally(() => {
        this.loaded = true
        this.loadedProfile = true
        this.fetching = false
      })
      
  }

  dismissError() {
    this.error = null
  }
}
