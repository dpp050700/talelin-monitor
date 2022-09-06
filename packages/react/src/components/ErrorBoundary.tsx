import React, { Component } from 'react'
import { reportData, formatData } from '@talelin/monitor-core'
import { ErrorCategory } from '@talelin/monitor-share'

interface Props {
  children: any
}

interface State {
  hasError: any
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch(error, info) {
    const data = formatData(ErrorCategory.REACT_ERROR, error)
    reportData(Object.assign({}, data, { componentStack: info.componentStack }))
    this.setState({ hasError: true })
  }

  render() {
    if (this.state.hasError) {
      return <h1>error</h1>
    }
    return this.props.children
  }
}

export default ErrorBoundary
