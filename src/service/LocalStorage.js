import Storage from 'react-native-storage'
import { AsyncStorage } from 'react-native'

/**
 * Extends Storage to allow storing Objects
 * Note: Cannot store circular references
 */
class MailLocalStorage extends Storage {

  _serialize(value) {
    return JSON.stringify(value)
  }

  _unserialize(value) {
    try {
      return JSON.parse(value)
    } catch(error) {}
    return null
  }

  /**
   * Get a value from storage
   * @param {string} key 
   * @param {function} callback 
   * @return {Promise}
   */
  get(key, callback) {
    return this.getItem(key, (error, value) => {
      callback(error, this._unserialize(value))
    }).then(value => this._unserialize(value))
  }

  /**
   * Set a value to storage
   * @param {string} key 
   * @param {object} value 
   * @param {function} callback 
   * @return {Promise}
   */
  set(key, value, callback) {
    return this.setItem(key, this._serialize(value), error => {
      callback(error)
    })
  }

  /**
   * Delete all values in storage
   */
  clear() {
    if (global.PLATFORM === 'web') {
      return window.localStorage.clear()
    } else {
      return AsyncStorage.clear()
    }
  }

}

// TODO extend localStorage with namespaces

function createStorage(opts) {
  const defaultOpts = {
    // maximum capacity, default 1000 
    size: 1000,
    // Use AsyncStorage for RN, or window.localStorage for web.
    // If not set, data would be lost after reload.
    storageBackend: global.PLATFORM === 'web' ? window.localStorage : AsyncStorage,
    // expire time, default 1 day(1000 * 3600 * 24 milliseconds).
    // can be null, which means never expire.
    defaultExpires: null,
    // cache data in the memory. default is true.
    enableCache: true,
    // if data was not found in storage or expired,
    // the corresponding sync method will be invoked and return 
    // the latest data.
    sync : {
      // we'll talk about the details later.
    }
  }
  return new MailLocalStorage({...defaultOpts, ...opts})
}

const storages = new Map()

export default function getStorage(opts = {}) {
  if (!storages.get(opts)) {
    storages.set(opts, createStorage(opts)) 
  }
  return storages.get(opts)
}
