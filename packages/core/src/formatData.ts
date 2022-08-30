import { ErrorCategory, MonitorCategory, ErrorLevel } from '@talelin/monitor-share'

interface IBaseData {
  kind: MonitorCategory //监控指标的大类
  url: string //当前访问的哪个页面
}

interface IErrorData extends IBaseData {
  type: ErrorCategory
  message: string
  filename: string
  position: string
  stack: string
  level?: ErrorLevel
}

function getLines(stack) {
  return stack
    .split('\n')
    .slice(1)
    .map((item) => item.replace(/^\s+at\s+/g, ''))
    .join('^')
}

export function formatJsErrorData(type: ErrorCategory, sourceData: any): IErrorData {
  return {
    kind: MonitorCategory.STABILITY,
    type,
    url: '',
    message: sourceData.message,
    filename: sourceData.filename,
    position: `${sourceData.lineno}:${sourceData.colno}`,
    stack: getLines(sourceData.error.stack)
  }
}

export function formatPromiseErrorData(type: ErrorCategory, sourceData: any): IErrorData {
  let message
  let filename
  let lineno
  let colno
  let stack
  let reason = sourceData.reason
  if (typeof reason === 'string') {
    message = reason
  } else if (typeof reason === 'object') {
    message = reason.message
    if (reason.stack) {
      let matchResult = reason.stack.match(/at\s+(.+):(\d+):(\d+)/)
      filename = matchResult[1]
      lineno = matchResult[2]
      colno = matchResult[3]
    }
    stack = getLines(reason.stack)
  }

  return {
    kind: MonitorCategory.STABILITY,
    type,
    url: '',
    message: message,
    filename: filename,
    position: `${lineno}:${colno}`,
    stack: stack
  }
}

export function formatResourceErrorData(type: ErrorCategory, sourceData: any): IErrorData {
  return {
    kind: MonitorCategory.STABILITY,
    type,
    url: sourceData.target.src,
    message: `资源访问：${sourceData.target.src}出错，文件资源不存在`,
    filename: '',
    position: '',
    stack: `tagName ${sourceData.target.tagName}^outerHTML ${sourceData.target.outerHTML}^src ${sourceData.target.src}`
  }
}

export function formatData(type: ErrorCategory, sourceData: any) {
  switch (type) {
    case ErrorCategory.JS_ERROR:
      return formatJsErrorData(type, sourceData)
      break
    case ErrorCategory.PROMISE_ERROR:
      return formatPromiseErrorData(type, sourceData)
      break
    case ErrorCategory.RESOURCE_ERROR:
      return formatResourceErrorData(type, sourceData)
      break
    default:
      break
  }
}
