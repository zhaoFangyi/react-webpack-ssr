import React from 'react'
import {
  inject,
  observer,
} from 'mobx-react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import queryString from 'query-string'

import Tabs, { Tab } from 'material-ui/Tabs'
import List from 'material-ui/List'
import { CircularProgress } from 'material-ui/Progress'

import { AppState, TopicStore } from '../../store/store'
import Container from '../layout/container'
import TopicListItem from './list-item'
import { tabs } from '../../util/variable-define'

@inject(stores => {
  return {
  appState: stores.appState,
  topicStore: stores.topicStore,
  }
  })
@observer // inject 注入需要的store
export default class TopicList extends React.Component {
  // 获取router对象
  static contextTypes = {
    router: PropTypes.object,
  }
  constructor() {
    super()
    this.changeTab = this.changeTab.bind(this)
    this.ListItemClick = this.ListItemClick.bind(this)
  }
  componentDidMount() {
    // do something here
    const tab = this.getTab()
    this.props.topicStore.fetchTopics(tab)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      this.props.topicStore.fetchTopics(this.getTab(nextProps.location.search))
    }
  }
  // componentWillReact(this) {
  // }
  ListItemClick(topic) {
    this.context.router.history.push(`/detail/${topic.id}`)
  }
  asyncBootstrap() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.props.appState.count = 3
        resolve(true)
      })
    })
  }
  getTab(search) {
    search = search || this.props.location.search
    const query = queryString.parse(search)
    return query.tab || 'all'
  }
  changeTab(e, value) {
    console.log(this.context)
    this.context.router.history.push({
      pathname: '/list',
      search: `?tab=${value}`,
    })
  }
  render() {
    const {
      topicStore,
    } = this.props
    const topicList = topicStore.topics
    const {
      createdTopics,
    } = topicStore
    const syncingTopic = topicStore.syncing
    const tab = this.getTab()
    const {
      user,
    } = this.props.appState
    return (
      <Container>
        <Helmet>
          <title>This is topic list</title>
          <meta name="description" content="This is description" />
        </Helmet>
        <Tabs value={tab} onChange={this.changeTab}>
          {
            Object.keys(tabs).map(t => (
              <Tab key={t} label={tabs[t]} value={t} />
            ))
          }
        </Tabs>
        {
          (createdTopics && createdTopics.length > 0) &&
          <List style={{ backgroundColor: '#dfdfdf' }}>
            {
              createdTopics.map((t) => {
                t = Object.assign({}, t, {
                  author: user.info,
                })
                return (
                  <TopicListItem
                    key={t.id}
                    topic={t}
                    onClick={() => this.ListItemClick(t)}
                  />
                )
              })
            }
          </List>
        }
        <List>
          {
            topicList.map(t => (
              <TopicListItem
                key={t.id}
                topic={t}
                onClick={() => this.ListItemClick(t)}
              />),
            )
          }
        </List>
        {
          syncingTopic ?
            (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  padding: '40px, 0',
                }}
              >
                <CircularProgress color="inherit" size={100} />
              </div>
            ) :
            null
        }
      </Container>
    )
  }
}

TopicList.wrappedComponent.propTypes = {
  appState: PropTypes.instanceOf(AppState),
  topicStore: PropTypes.instanceOf(TopicStore),
}

TopicList.propTypes = {
  location: PropTypes.object.isRequired,
}
