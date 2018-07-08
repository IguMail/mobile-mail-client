export default {
  clone: obj => {
    try {
      return JSON.parse(JSON.stringify(obj))
    } catch(e) {
      return Object.assign({}, obj)
    }
  }
}
