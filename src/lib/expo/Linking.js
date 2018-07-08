import { Linking } from 'react-native'

const debug = require('../debug')('igumail:Linking')

// augment for browser
const ExpoLinking = Object.assign(Linking, {
  getInitialURL() {
    const url = global.location.href
    debug('Initial URL', url)
    return Promise.resolve(global.location.href)
  },
  parse(url) {
    const parsed = new global.URL(url)
    const queryParams = {}
    parsed.searchParams.forEach( (value, key) => queryParams[key] = value)
    const path = url.pathname
    // TODO check compat
    return { path, queryParams }
  },
  parseInitialURLAsync(url) {
    return this.parse(url)
  },
  makeUrl(url, params) {
    const { location, URL, URLSearchParams } = global
    const base = location.href
    return new URL(base + url) + '?' + (new URLSearchParams(params)).toString()
  }
})

export default ExpoLinking
