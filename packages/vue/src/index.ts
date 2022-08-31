const MonitorVue = {
  install(Vue) {
    const errorHandler = Vue.config.errorHandler
    console.log(errorHandler)
    Vue.config.errorHandler = function (err, vm, info) {
      console.log(vm.$root === vm ? true : false)
      console.log(vm.$options._componentTag)
      if (typeof errorHandler === 'function') {
        errorHandler.call(this, err, vm, info)
      }
    }
  }
}

export default MonitorVue
