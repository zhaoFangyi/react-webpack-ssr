import React from 'react'
// import SimpleMDE from 'react-simplemde-editor'
import PropTypes from 'prop-types'

import {
  inject,
  observer,
} from 'mobx-react'

import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField'
import Radio from 'material-ui/Radio'
import Button from 'material-ui/Button'
import Snackbar from 'material-ui/Snackbar'
import IconReply from 'material-ui-icons/Reply'

import SimpleMDE from '../../components/simple-mde'
import Container from '../layout/container'
import { TopicStore } from '../../store/store'
import createStyles from './styles'
import { tabs } from '../../util/variable-define'

@inject((stores) => {
  return {
  topicStore: stores.topicStore,
  }
  }) @observer

class TopicCreate extends React.Component {
  // 获取router对象
  static contextTypes = {
    router: PropTypes.object,
  }
  constructor() {
    super()
    this.state = {
      title: '',
      tab: 'dev',
      content: '',
      message: '',
      open: false,
    }
    this.handleChangeTab = this.handleChangeTab.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleContentChange = this.handleContentChange.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }
  handleChangeTab(e) {
    this.setState({
      tab: e.currentTarget.value,
    })
  }
  handleCreate(value) {
    const {
      tab, title, content,
    } = this.state
    if (!title) {
      this.showMessage('title 必须填写')
      return
    }
    if (!content) {
      this.showMessage('内容必须填写')
      return
    }
    this.props.topicStore.createTopic(title, tab, content)
      .then(() => {
        this.context.router.history.replace('/list')
      }).catch((err) => {
        this.showMessage(err.message)
      })
  }
  handleTitleChange(e) {
    // this.context.router.history.replace('/user/login')
    this.setState({
      title: e.target.value.trim(),
    })
  }
  handleContentChange(value) {
    this.setState({
      content: value,
    })
  }
  handleClose() {
    this.setState({
      open: false,
    })
  }
  showMessage(message) {
    this.setState({
      open: true,
      message,
    })
  }
  render() {
    const {
      classes,
    } = this.props
    const {
      message,
      open,
    } = this.state
    return (
      <Container>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          message={message}
          open={open}
          onRequestClose={this.handleClose}
        />
        <div className={classes.root}>
          <TextField
            className={classes.title}
            label="标题"
            value={this.state.title}
            onChange={this.handleTitleChange}
            fullWidth
          />
          <SimpleMDE
            onChange={this.handleContentChange}
            value={this.state.content}
            options={{
              toolbar: false,
              spellChecker: false,
              placeholder: '发表你的精彩评论',
            }}
          />
          <div>
            {
              Object.keys(tabs).map((tab) => {
                if (tab !== 'all' && tab !== 'good') {
                  return (
                    <span className={classes.selectItem} key={tab}>
                      <Radio
                        value={tab}
                        checked={tab === this.state.tab}
                        onChange={this.handleChangeTab}
                      />
                      {tabs[tab]}
                    </span>
                  )
                }
                return null
              })
            }
          </div>
          <Button
            fab
            color="primary"
            onClick={this.handleCreate}
            className={classes.replyButton}
          >
            <IconReply />
          </Button>
        </div>
      </Container>
    )
  }
}

TopicCreate.wrappedComponent.propTypes = {
  topicStore: PropTypes.instanceOf(TopicStore),
}

TopicCreate.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(createStyles)(TopicCreate)
