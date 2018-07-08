const debug = require('../debug')('igumail:lazy')
const path = require('path')

class LazyModule {
  name
  path

  constructor(name) {
    this.name = name
  }

  get module() {
    debug('import ', this.name)
    return import('' + this.name)
  }

  require() {
    debug('require', this.module)
    const module = this.module
    return module
  }

}

/**
  * @example const expo = new LazyModule('expo').require()
  */
export default LazyModule
