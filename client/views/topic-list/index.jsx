import React from 'react'
import { inject, observer } from 'mobx-react'
import { observable } from 'mobx'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button'
import Helmet from 'react-helmet'
import { AppState } from '../../store/app-state'

@inject('appState') @observer // inject 注入需要的store
export default class TopicList extends React.Component {
  constructor() {
    super()
    this.changeName = this.changeName.bind(this)
  }
  componentDidMount() {
    // do something here
    setInterval(() => {
      this.secondsPsssed += 1
    }, 5000)
  }
  asyncBootstrap() {
    console.log('zheli')
    return new Promise((resolve) => {
      setTimeout(() => {
        this.props.appState.count = 3
        resolve(true)
      })
    })
  }
  // componentWillReact(this) {
  // }
  changeName(event) {
    this.props.appState.changeName(event.target.value)
  }
  @observable secondsPsssed = 0
  render() {
    return (
      <div>
        <Helmet>
          <title>This is topic list</title>
          <meta name="description" content="This is description" />
        </Helmet>
        <Button raised color="primary">This is button</Button>
        <input type="text" onChange={this.changeName} />
        this is topic list
        <p>{this.props.appState.msg}</p>
        {this.props.appState.name}
        <p>{this.secondsPsssed}</p>
      </div>
    )
  }
}

TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState),
}
