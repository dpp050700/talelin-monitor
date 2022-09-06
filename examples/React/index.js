const h = React.createElement

const ErrorBoundary = MONITOR.MonitorReact

class Count extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    console.log(this.state.a.v)
  }

  render() {
    // throw new Error('error')
    return h('button', { onClick: this.handleClick, id: 'numException' }, '触发 Error')
  }
}
ReactDOM.render(h(ErrorBoundary, {}, [h(Count, { count: 1 })]), document.getElementById('root'))
