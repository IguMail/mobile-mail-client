import GetThreads from './getThreads'
import GetThread from './getThread'
import SendMail from './sendMail'

const threads = {}
const sendMails = {}

export default {
  getThreads: new GetThreads(),
  getThread: id => {
    if (!threads[id]) {
      threads[id] = new GetThread(id)
    }
    return threads[id]
  },
  sendMail: email => {
    if (!sendMails[email]) {
      sendMails[email] = new SendMail(email)
    }
    return sendMails[email]
  }
};
