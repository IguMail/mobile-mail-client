import { Linking } from 'react-native'

// augment for browser
const ExpoLinking = Object.assign(Linking, {
  parse(url) {
    return url // TODO
  },
  parseInitialURLAsync(url) {
    return url // TODO
  },
  makeUrl(url, params) {
    const { location, URL, URLSearchParams } = global
    const base = location.href
    return new URL(base + url) + '?' + (new URLSearchParams(params)).toString()
  }
})

export default ExpoLinking