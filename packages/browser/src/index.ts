import { trackHandlers, triggerHandlers, formatData } from '@talelin/monitor-core'
import { ErrorCategory, MonitorCategory } from '@talelin/monitor-share'
import { jsErrorHandler, promiseErrorHandler, resourceErrorHandler } from './defaultHandler'

//判断是 JS异常、静态资源异常、还是跨域异常
export const getErrorKey = (event: ErrorEvent | Event) => {
  const isJsError = event instanceof ErrorEvent
  if (!isJsError) return ErrorCategory.RESOURCE_ERROR
  return event.message === 'Script error.' ? '' : ErrorCategory.JS_ERROR
}

interface IMonitorOptions {
  url: string // 上报地址
  appId: string | number // 项目标识
  jsError?: boolean // 是否收集 js error
  resourceError?: boolean // 是否收集 资源 error
  promiseError?: boolean // 是否收集 promise error
  vueError?: boolean // 是否收集 vue error
  ajaxError?: boolean // 是否收集 ajax error
}

export default class Monitor {
  url: string // 上报地址
  jsError: boolean // 是否收集 js error
  resourceError: boolean // 是否收集 资源 error
  promiseError: boolean // 是否收集 promise error
  vueError: boolean // 是否收集 vue error
  ajaxError: boolean // 是否收集 ajax error
  appId: string | number // 项目标识

  constructor({
    url,
    appId,
    jsError = true,
    resourceError = true,
    promiseError = true,
    ajaxError = true,
    vueError = true
  }: IMonitorOptions) {
    this.url = url
    this.appId = appId
    this.jsError = jsError
    this.resourceError = resourceError
    this.promiseError = promiseError
    this.ajaxError = ajaxError
    this.vueError = vueError
  }

  init() {
    if (this.jsError) {
      this.listenJsError()
      this.registerJsError(jsErrorHandler)
    }

    if (this.promiseError) {
      this.listenPromiseError()
      this.registerPromiseError(promiseErrorHandler)
    }

    if (this.resourceError) {
      this.listenResourceError()
      this.registerResourceError(resourceErrorHandler)
    }
  }

  listenJsError() {
    window.addEventListener('error', function (error) {
      if (getErrorKey(error) !== ErrorCategory.JS_ERROR) return
      triggerHandlers(ErrorCategory.JS_ERROR, error)
    })
  }

  listenPromiseError() {
    window.addEventListener('unhandledrejection', function (e) {
      triggerHandlers(ErrorCategory.PROMISE_ERROR, e)
    })
  }

  listenResourceError() {
    window.addEventListener(
      'error',
      function (error) {
        if (getErrorKey(error) !== ErrorCategory.RESOURCE_ERROR) return
        triggerHandlers(ErrorCategory.RESOURCE_ERROR, error)
      },
      true
    )
  }

  registerJsError(fn) {
    this.jsError && trackHandlers(ErrorCategory.JS_ERROR, fn)
  }

  registerPromiseError(fn) {
    this.promiseError && trackHandlers(ErrorCategory.PROMISE_ERROR, fn)
  }

  registerResourceError(fn) {
    this.resourceError && trackHandlers(ErrorCategory.RESOURCE_ERROR, fn)
  }
}
