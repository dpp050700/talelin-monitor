import { reportData } from '@talelin/monitor-core'

import semver from 'semver'

function formatComponentName(vm, version) {
  switch (version) {
    case 2:
      if (vm.$root === vm) return 'root'
      var name = vm._isVue ? (vm.$options && vm.$options.name) || (vm.$options && vm.$options._componentTag) : vm.name
      return (
        (name ? 'component <' + name + '>' : 'anonymous component') +
        (vm._isVue && vm.$options && vm.$options.__file ? ' at ' + (vm.$options && vm.$options.__file) : '')
      )
      break
    case 2:
      if (vm.$root === vm) return 'root'
      const comName = vm.$options && vm.$options.name
      return comName ? 'component <' + comName + '>' : 'anonymous component'
      break

    default:
      break
  }
}

export function handlerVueError(error, vm, info, Vue) {
  const vueVersion = semver.valid(Vue?.version)
  if (vueVersion) {
    if (semver.lt(vueVersion, '2.0.0')) {
      console.warn('未针对 Vue1.x 版本进行处理')
    } else if (semver.lt(vueVersion, '3.0.0')) {
      vue2Handler(vm)
    } else if (semver.lt(vueVersion, '4.0.0')) {
      vue3Handler(vm)
    } else {
      console.warn(`Vue 版本：${vueVersion} 非法`)
    }
  }
}

function vue2Handler(vm) {
  return {
    componentName: formatComponentName(vm, 2),
    propsData: vm.$options && vm.$options.propsData
  }
}

function vue3Handler(vm) {
  return {
    componentName: formatComponentName(vm, 3),
    propsData: vm.$props
  }
}
