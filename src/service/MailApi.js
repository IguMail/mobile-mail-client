const URL = require('url')
const debug = require('../lib/debug')('chaterr:MailApi')

/**
 * Chaterr REST API
 */
class MailApi {

  accountId = null
  
  options = {
    url: 'https://api.igumail.com',
    headers: {
      'user-agent': 'Chaterr 1.0',
    }
  }

  constructor(accountId, options = {}) {
    if (!accountId) throw new Error('accountId parameter required')
    debug('new mailAPI', accountId, options)
    this.accountId = accountId
    this.options = {
      ...this.options,
      ...options
    }
  }

  /**
  * @deprecated
  */
  setApiUrl(url) {
    this.options.url = url
  }

  setAuthToken(token) {
    this.options.headers['X-Auth-Token'] = token
  }

  // user account profile
  account() {
    return this.get('/account/:account/profile')
  }

  // linked mail accounts
  accounts() {
    return this.get('/account/:account/accounts')
  }

  // create custom user account
  createUserProfile(user) {
    return this.postJson('/account/:account/profile/create', user)
  }

  // add a custom mail account
  addMailAccount(account) {
    return this.postJson('/account/:account/add', account)
  }

  messages() {
    return this.get('/account/:account/messages')
  }

  message(id) {
    return this.get('/account/:account/messages/' + id)
  }

  threads() {
    return this.get('/account/:account/threads')
  }

  thread(id) {
    return this.get('/account/:account/threads/' + id)
  }

  attachment(id) {
    return this.get('/attachments/download/' + id)
  }

  sendMail(email, mail) {
    return this.postJson('/account/:account/sendmail/' + email, {
      mail
    })
  }

  buildUrl(path) {
    path = path.replace([
      ':account'
    ], [
      this.accountId
    ])
    return URL.parse(this.options.url + path)
  }

  get(path, params, options = {}) {
    if (!path) throw new Error('Path required')
    const url = this.buildUrl(path)
    if (params) {
      url.search = new URLSearchParams(params)
    }
    return new Endpoint(url, {
      headers: {
        ...this.options.headers
      },
      ...options
    }, res => res.json())
  }

  postJson(path, data, options = {}) {
    if (!path) throw new Error('Path required')
    const url = this.buildUrl(path)
    
    return new Endpoint(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        ...this.options.headers,
        'content-type': 'application/json'
      },
      ...options
    }, res => res.json())
  }

  postForm(path, params = {}, options = {}) {
    if (!path) throw new Error('Path required')
    const url = this.buildUrl(path)
    const body = new FormData()
    Object.keys(params).map(key => body.append(key, params[key]))

    return new Endpoint(url, {
      method: 'POST',
      body,
      headers: {
        ...this.options.headers,
        'content-type': 'application/json'
      },
      ...options
    }, res => res.json())
  }

}

/**
 * Represents a REST Endoint
 */
class Endpoint {

  request = null
  then = null

  constructor(url, options, then) {
    this.request = new Request(url, options)
    this.then = then
  }

  fetch() {
    debug('fetching', this.request)
    return fetch(this.request.url.href, this.request.options)
      .then(res => {
        debug('fetch complete', res)
        return this.then ? this.then(res) : res
      })
      .catch(err => debug('Request failed'))
  }

}

/**
 * Represents a REST Endpoing fetch
 * TODO: Use WHATWG Request
 */
class Request {

  url = null
  options = null

  constructor(url, options = {}) {
    this.url = url
    this.options = options
  }
}

 export default MailApi