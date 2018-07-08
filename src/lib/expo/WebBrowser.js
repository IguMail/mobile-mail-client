class WebBrowser {
  openBrowserAsync(url) {
    let status = false
    try {
      status = global.window.location.href = url
    } catch(e) {}
    return Promise.resolve(status)
  }
  openAuthSessionAsync(url) {
    return this.openBrowserAsync(url)
  }
}


export default new WebBrowser()
