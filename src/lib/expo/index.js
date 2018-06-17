let Expo, Linking, WebBrowser, Constants

// global.Expo is set in App.native.js
if (global.Expo) {
  Expo = global.Expo
  Linking = Expo.Linking
  WebBrowser = Expo.WebBrowser
  Constants = Expo.Constants
} else {
  Linking = require('./Linking').default
  WebBrowser = require('./WebBrowser').default
  Constants = require('./Constants').default
  Expo = { Linking, WebBrowser, Constants }
}

export default Expo
export {
  Linking, WebBrowser, Constants
}