import React from 'react'
import PropTypes from 'prop-types'
import {
  inject,
  observer,
} from 'mobx-react'

import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'

import UserWrapper from './user'
import infoStyles from './styles/user-info-style'

const TopicItem = ({ topic, onClick }) => {
  return (
    <ListItem button onClick={onClick}>
      <Avatar src={topic.author.avatar_url} />
      <ListItemText
        primary={topic.title}
        secondary={`最新回复： ${topic.last_reply_at}`}
      />
    </ListItem>
  )
}

TopicItem.propTypes = {
  topic: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
}

@inject((stores) => {
  return {
  user: stores.appState.user,
  appState: stores.appState
  }
  }) @observer
class UserInfo extends React.Component {
  // 获取router对象
  static contextTypes = {
    router: PropTypes.object,
  }
  constructor() {
    super()
    this.goToTopic = this.goToTopic.bind(this)
  }
  componentWillMount() {
    this.props.appState.getUserDetail()
    this.props.appState.getUserCollection()
  }
  goToTopic(id) {
    this.context.router.history.replace(`/detail/${id}`)
  }
  render() {
    const { classes } = this.props
    const topics = this.props.user.detail.recentTopics || []
    const replies = this.props.user.detail.recentReplies || []
    const collections = this.props.user.collections.list || []
    return (
      <UserWrapper>
        <div className={classes.root}>
          <Grid container spacing={16} align="stretch">
            <Grid item xs={12} md={4}>
              <Paper elevation={2}>
                <Typography className={classes.partTitle}>
                  <span>最近发布的话题</span>
                </Typography>
                <List>
                  {
                    topics.length > 0 ?
                      topics.map(topic =>
                        (<TopicItem
                          topic={topic}
                          key={topic.id}
                          onClick={() => this.goToTopic(topic.id)}
                        />)) :
                      <Typography align="center">
                        最近没有发布话题
                      </Typography>
                  }
                </List>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={2}>
                <Typography className={classes.partTitle}>
                  <span>新的回复</span>
                </Typography>
                <List>
                  {
                    replies.length > 0 ?
                      replies.map(topic =>
                        (<TopicItem
                          topic={topic}
                          key={topic.id}
                          onClick={() => this.goToTopic(topic.id)}
                        />)) :
                      <Typography align="center">
                        最近没有新的回复
                      </Typography>
                  }
                </List>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={2}>
                <Typography className={classes.partTitle}>
                  <span>收藏的回复</span>
                </Typography>
                <List>
                  {
                    collections.length > 0 ?
                      collections.map(topic =>
                        (<TopicItem
                          topic={topic}
                          key={topic.id}
                          onClick={() => this.goToTopic(topic.id)}
                        />)) :
                      <Typography align="center">
                        还么有收藏话题哦
                      </Typography>
                  }
                </List>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </UserWrapper>
    )
  }
}

UserInfo.propTypes = {
  classes: PropTypes.object.isRequired,
}

UserInfo.wrappedComponent.propTypes = {
  user: PropTypes.object.isRequired,
  appState: PropTypes.object.isRequired,
}

export default withStyles(infoStyles)(UserInfo)
