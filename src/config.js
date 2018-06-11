
const development = {
  api: {
    url: 'http://gandas-MacBook-Pro.local:3030'
  },
  mqtt: {
    url: 'ws://localhost:8883'
  }
}

const production = {
  api: {
    url: 'https://api.igumail.com'
  },
  mqtt: {
    url: 'ws://mqtt.igumail.com/'
  }
}

const config = process.env.NODE_ENV === 'development' 
  ? development
  : production

export default config