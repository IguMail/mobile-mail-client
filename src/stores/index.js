import GetAccount from './getAccount'
import GetThreads from './getThreads'
import GetThread from './getThread'
import SendMail from './sendMail'
import SideMenu from './sideMenu'

const instances = {}

function factory(creator, ...args) {
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
  getThreads(accountId, auth) {
    return factory(GetThreads, accountId, auth)
  },
  getThread(accountId, auth, id) {
    return factory(GetThread, accountId, auth, id)
  },
  sendMail(accountId, email) {
    return factory(SendMail, accountId, email)
  },
  sideMenu: new SideMenu()
};
