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

  setAuthToken(token) {
    this.options.headers['X-Auth-Token'] = token
  }

  messages() {
    this.get('/account/:account/messages')
  }

  buildUrl(path) {
    path = path.replace([
      ':account'
    ], [
      this.account
    ])
    return new URL(this.url + path)
  }

  get(path, params, options = {}) {
    if (!path) throw new Error('Path required')
    const url = this.buildUrl(path)
    if (params) {
      url.search = new URLSearchParams(params)
    }
    return fetch(url, {
      headers: {
        ...this.options.headers
      },
      ...options
    })
    .then(res => res.json())
  }

  postJson(path, data, options = {}) {
    if (!path) throw new Error('Path required')
    const url = this.buildUrl(path)
    
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        ...this.options.headers,
        'content-type': 'application/json'
      },
      ...options
    })
    .then(res => res.json())
  }

  postForm(path, params = {}, options = {}) {
    if (!path) throw new Error('Path required')
    const url = this.buildUrl(path)
    const body = new FormData()
    Object.keys(params).map(key => body.append(key, params[key]))

    return fetch(url, {
      method: 'POST',
      body,
      headers: {
        ...this.options.headers,
        'content-type': 'application/json'
      },
      ...options
    })
    .then(res => res.json())
  }

 }