import MqttClient from './MqttClient'
import MailApi from './MailApi'

const instances = {}

/**
 * Service Factory
 * @todo use Map()
 */
export default function factory(creator, ...args) {
  const name = creator.toString()
  const id = JSON.stringify(args)
  if (!instances[name]) {
    instances[name] = {}
  }
  if (!instances[name][id]) {
    instances[name][id] = new creator(...args)
  }
  return instances[name][id]
}

export const MqttClientFactory = (...args) => factory(MqttClient, ...args)
export const MailApiFactory = (...args) => factory(MailApi, ...args)
