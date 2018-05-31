import GetThreads from './getThreads'
import GetThread from './getThread'

const threads = {}

export default {
  getThreads: new GetThreads(),
  getThread: id => {
    if (!threads[id]) {
      threads[id] = new GetThread(id)
    }
    return threads[id]
  }
};
