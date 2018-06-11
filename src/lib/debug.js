module.exports = function(...args) {
  if (typeof require.resolve !== 'undefined') {
    return require('debug')(...args)
  } else {
    return console.log.bind(console)
  }
}