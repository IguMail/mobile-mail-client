import LazyModule from '../../lib/LazyModule'

let Linking
let WebBrowser
let Constants 

console.log('global', global)

if(global.window) {
  (async () => {
    Linking = await new LazyModule('./Linking').require()
    WebBrowser = await new LazyModule('./WebBrowser').require()
    Constants = await new LazyModule('./Constants').require()
  })()
} else {
  (async () => {
    const Expo = await new LazyModule('expo').require()
    let { Linking, WebBrowser, Constants } = Expo
  })()
}

export { Linking, WebBrowser, Constants }
//export default Expo
