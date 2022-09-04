import { reportData } from '@talelin/monitor-core'

import semver from 'semver'

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
  console.log(vm, 22)
}

function vue3Handler(vm) {}
