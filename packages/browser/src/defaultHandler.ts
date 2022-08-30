import { formatData, reportData } from '@talelin/monitor-core'
import { ErrorCategory } from '@talelin/monitor-share'

export function jsErrorHandler(error) {
  const data = formatData(ErrorCategory.JS_ERROR, error)
  reportData(data)
}

export function promiseErrorHandler(error) {
  const data = formatData(ErrorCategory.PROMISE_ERROR, error)
  reportData(data)
}

export function resourceErrorHandler(error) {
  const data = formatData(ErrorCategory.RESOURCE_ERROR, error)
  reportData(data)
}
