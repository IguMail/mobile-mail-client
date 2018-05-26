const URL = require('url')
const debug = require('debug')('Chaterr:MailAPI')

/**
 * IguMail REST API
 */
class MailApi {

  url = 'https://api.igumail.com'
  account = null

  options = {
    headers: {
      'user-agent': 'Chaterr 1.0',
    }
  }

  constructor(account, options = {}) {
    if (!account) throw new Error('Account parameter required')
    this.account = account
    this.options = {
      ...this.options,
      options
    }
  }

  setApiUrl(url) {
    this.url = url
  }

  setAuthToken(token) {
    this.options.headers['X-Auth-Token'] = token
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
    return this.get('/account/:account/thread/' + id)
  }

  attachment(id) {
    return this.get('/attachments/download/' + id)
  }

  buildUrl(path) {
    path = path.replace([
      ':account'
    ], [
      this.account
    ])
    return URL.parse(this.url + path)
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
    return fetch(this.request.url.href, this.request.options)
      .then(res => this.then ? this.then(res) : res)
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