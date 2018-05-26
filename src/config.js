
const development = {
  api: {
    url: 'http://gandas-MacBook-Pro.local:3030'
  }
}

const production = {
  api: {
    url: 'https://api.igumail.com'
  }
}

let config = production
if (process.env.NODE_ENV === 'development') {
  config = development
}

export default config