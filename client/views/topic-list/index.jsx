import React from 'react'
import { inject, observer } from 'mobx-react'
import { observable } from 'mobx'
import PropTypes from 'prop-types'
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
  // componentWillReact(this) {
  // }
  changeName(event) {
    this.props.appState.changeName(event.target.value)
  }
  @observable secondsPsssed = 0
  render() {
    return (
      <div>
        <input type="text" onChange={this.changeName} />
        this is topic list{this.props.appState.msg}{this.props.appState.name}
        <p>{this.secondsPsssed}</p>
      </div>
    )
  }
}

TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState),
}
