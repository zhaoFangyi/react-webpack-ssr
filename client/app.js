import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader' // eslint-disable-line
import { Provider } from 'mobx-react'
import App from './views/App'
import Routes from './config/router'
import AppState from './store/app-state'

const initialState = window.__INITIAL__STATE__ || {} // eslint-disable-line

const root = document.getElementById('root')
const render = (Component) => {
  // const renderMethod = module.hot ? ReactDom.render : ReactDom.hydrate
  ReactDom.render(
    <AppContainer>
      <Provider appState={new AppState(initialState.appState)}>
        <Router>
          <div>
            <Component />
            <ul>
              <li><Link to="/">首页</Link></li>
              <li><Link to="/list">列表</Link></li>
              <li><Link to="/detail">详情页面</Link></li>
              <li><Link to="/test">测试</Link></li>
            </ul>
            <Routes />
          </div>
        </Router>
      </Provider>
    </AppContainer>,
    root,
  )
};
render(App)

if (module.hot) {
  module.hot.accept('./views/App', () => {
    const NextApp = require('./views/App').default; // eslint-disable-line
    render(NextApp)
  })
}
