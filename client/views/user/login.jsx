import React from 'react'
import PropTypes from 'prop-types'
import {
  inject,
  observer,
} from 'mobx-react'
import {
  Redirect,
} from 'react-router-dom'
import queryString from 'query-string'

import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'

import UserWrapper from './user'
import loginStyles from './styles/login-style'


@inject((stores) => {
  return {
  appState: stores.appState,
  user: stores.appState.user,
  }
  }) @observer
class UserLogin extends React.Component {
  // 获取router对象
  static contextTypes = {
    router: PropTypes.object,
  }
  constructor() {
    super()
    this.state = {
      accesstoken: '',
      helpText: '',
    }
    this.handleLogin = this.handleLogin.bind(this)
    this.handleInput = this.handleInput.bind(this)
  }
  getFrom(location) {
    location = location || this.props.location
    const query = queryString.parse(location.search)
    return query.from || '/user/info'
  }
  handleLogin() {
    const ctx = this
    if (!ctx.state.accesstoken) {
      return this.setState({
        helpText: '必须填写',
      })
    }
    ctx.setState({
      helpText: '',
    })
    return this.props.appState.login(this.state.accesstoken)
      .catch((err) => {
        console.log(err)
      })
  }
  handleInput(event) {
    this.setState({
      accesstoken: event.target.value.trim(),
    })
  }
  render() {
    const { classes } = this.props
    const from = this.getFrom()
    const { isLogin } = this.props.user
    if (isLogin) {
      return <Redirect to={from} />
    }
    return (
      <UserWrapper>
        <div className={classes.root}>
          <TextField
            className={classes.input}
            label="请输入Conde AccessToken"
            placeholder="请输入Conde AccessToken"
            required
            helperText={this.state.helpText}
            value={this.state.accesstoken}
            onChange={this.handleInput}
          />
          <Button
            raised
            color="inherit"
            onClick={this.handleLogin}
            className={classes.loginButton}
          >
            登录
          </Button>
        </div>
      </UserWrapper>
    )
  }
}

UserLogin.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

UserLogin.wrappedComponent.propTypes = {
  appState: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

export default withStyles(loginStyles)(UserLogin)
