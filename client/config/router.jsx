import React from 'react'
import {
  Route,
  Redirect,
  withRouter,
} from 'react-router-dom'
import {
  inject,
  observer,
} from 'mobx-react'
import PropTypes from 'prop-types'

import TopicList from '../views/topic-list/index'
import TopicDetail from '../views/topic-detail/index'
import UserLogin from '../views/user/login'
import UserInfo from '../views/user/info'
import TopicCreate from '../views/topic-create'
import TestApi from '../views/test/api-test'

const PrivateRoute = ({ isLogin, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={
      props => (
        isLogin ?
          <Component {...props} /> :
          <Redirect
            to={{
              pathname: '/user/login',
              search: `?from=${rest.path}`,
            }}
          />
      )
    }
  />
)
const InjectedPrivateRoute = withRouter(inject((stores) => {
  return {
    isLogin: stores.appState.user.isLogin,
  }
})(observer(PrivateRoute)))

PrivateRoute.propTypes = {
  isLogin: PropTypes.bool,
  component: PropTypes.element.isRequired,
}
PrivateRoute.defaultProps = {
  isLogin: false,
}

export default () => [
  <Route path="/" render={() => <Redirect to="/list" />} exact key="first" />,
  <Route path="/list" component={TopicList} key="list" />,
  <Route path="/detail/:id" component={TopicDetail} key="detail" />,
  <Route path="/test" component={TestApi} key="test" />,
  <Route path="/user/login" exact component={UserLogin} key="login" />,
  <InjectedPrivateRoute path="/user/info" exact component={UserInfo} key="info" />,
  <InjectedPrivateRoute path="/topicCreate" exact component={TopicCreate} key="topicCreate" />,
]
