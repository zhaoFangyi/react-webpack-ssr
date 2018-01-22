import React from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { AppState } from '../../store/app-state'

@inject('appState') @observer // inject 注入需要的store
export default class TopicList extends React.Component {
  componentDidMount() {
    // do something here
  }
  render() {
    return (
      <div>this is topic list{this.props.appState.msg}</div>
    )
  }
}

TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState).isRequired,
}
