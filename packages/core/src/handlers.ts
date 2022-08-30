import { ErrorCategory } from '@talelin/monitor-share'

type IHandler = (data: any) => void

type IHandlers = {
  [key in ErrorCategory]?: IHandler[]
}

const handlers: IHandlers = {}

export function trackHandlers(type: ErrorCategory, callback) {
  handlers[type] = handlers[type] || []
  handlers[type].push(callback)
}

export function triggerHandlers(type: ErrorCategory, error) {
  if (!type || !handlers[type]) return
  handlers[type].forEach((handler) => {
    handler(error)
  })
}
