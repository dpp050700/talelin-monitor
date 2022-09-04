import { handlerVueError } from './helper'

const MonitorVue = {
  install(Vue) {
    const errorHandler = Vue.config.errorHandler
    console.log(errorHandler)
    Vue.config.errorHandler = function (err, vm, info) {
      handlerVueError.apply(null, [err, vm, info, Vue])

      if (typeof errorHandler === 'function') {
        errorHandler.call(this, err, vm, info)
      }
    }
  }
}

export default MonitorVue
