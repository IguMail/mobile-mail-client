
const development = {
  api: {
    url: 'http://gandas-MacBook-Pro.local:3030'
  },
  mqtt: {
    url: 'ws://gandas-MacBook-Pro.local:8883'
  },
  oauth: {
    url: 'http://localhost:5000'
    //url: 'http://172.20.10.10.nip.io:5000'
    //url: 'http://192.168.100.102.nip.io:5000'
    //url: 'http://gandas-MacBook-Pro.local:5000'
    //url: 'http://10.14.33.122.nip.io:5000'
  }
}

const production = {
  api: {
    url: 'https://api.igumail.com'
  },
  mqtt: {
    url: 'ws://mqtt.igumail.com/'
  },
  oauth: {
    url: 'http://auth.igumail.com'
  }
}

const config = process.env.NODE_ENV === 'development' 
  ? development
  : production

export default config
