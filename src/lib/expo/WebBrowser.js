import { Linking } from './'

const WebBrowser = {
  openBrowserAsync(url) {
    return Promise.resolve(Linking.openURL(url))
  }
}


export default WebBrowser