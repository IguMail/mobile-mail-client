/**
 * IguMail REST API
 */
 class MailApi {

  url = 'https://api.igumail.com'

  options = {
    headers: {
      'user-agent': 'Chaterr 1.0',
    }
  }

  constructor(url, options = {}) {
    if (url) {
      this.url = url
    }
    this.options = {
      ...this.options,
      options
    }
  }

  setAuthToken(token) {
    this.options.headers['X-Auth-Token'] = token
  }

  get(path, params, options = {}) {
    if (!path) throw new Error('Path required')
    const url = new URL(this.url + path)
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
    const url = new URL(this.url + path)
    
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
    const url = new URL(this.url + path)
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