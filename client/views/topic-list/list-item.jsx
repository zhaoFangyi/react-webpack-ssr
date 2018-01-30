import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import dateFormat from 'dateformat'

import { withStyles } from 'material-ui/styles'
import { ListItem, ListItemText } from 'material-ui/List'
import ListItemAvatar from 'material-ui/List/ListItemAvatar'
import Avatar from 'material-ui/Avatar'

import { tabs } from '../../util/variable-define'
import {
  topicPrimaryStyle,
  topicSecondaryStyle,
} from './styles'

const Primary = ({ classes, topic }) => {
  const classNames = cx({
    [classes.tab]: true,
    [classes.top]: topic.top,
  })
  return (
    <div className={classes.root}>
      <span className={classNames}>{topic.top ? '置顶' : tabs[topic.tab]}</span>
      <span className={classes.title}>{topic.title}</span>
    </div>
  )
}

const StyledPrimary = withStyles(topicPrimaryStyle)(Primary)

Primary.propTypes = {
  topic: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

const Secondary = ({ classes, topic }) => (
  <span className={classes.root}>
    <span className={classes.userName}>{topic.author.loginname}</span>
    <span className={classes.count}>
      <span>{topic.reply_count}</span>
      <span>/</span>
      <span>{topic.visit_count}</span>
    </span>
    <span className={classes.accentColor}>创建时间：{dateFormat(topic.create_at, 'yy年mm月dd日')}</span>
  </span>
)

const StyledSecondary = withStyles(topicSecondaryStyle)(Secondary)

Secondary.propTypes = {
  topic: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}
const topicListItem = ({ onClick, topic }) => (
  <ListItem button onClick={onClick}>
    <ListItemAvatar>
      <Avatar src={topic.author.avatar_url} />
    </ListItemAvatar>
    <ListItemText
      primary={<StyledPrimary topic={topic} />}
      secondary={<StyledSecondary topic={topic} />}
    />
  </ListItem>
)

topicListItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  topic: PropTypes.object.isRequired,
}

export default topicListItem
