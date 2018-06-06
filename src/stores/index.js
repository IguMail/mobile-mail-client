import GetAccount from './getAccount'
import GetThreads from './getThreads'
import GetThread from './getThread'
import SendMail from './sendMail'

const instances = {}

function factory(creator, args) {
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

export default {
  getAccount: new GetAccount(),
  getThreads(accountId) {
    return factory(GetThreads, [accountId])
  },
  getThread(accountId, id) {
    return factory(GetThread, [accountId, id])
  },
  sendMail(accountId, email) {
    return factory(SendMail, [accountId, email])
  }
};
