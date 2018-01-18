import React from 'react'
import { Link } from 'react-router-dom'
import Routes from '../config/router'

export default class App extends React.Component {
  componentDidMount() {
    console.log('componentDidMount')
  }
  render() {
    return [
      <div>
        <ul>
          <li>
            <Link to="/list">列表页</Link>
          </li>
          <li>
            <Link to="/detail">详情页</Link>
          </li>
        </ul>
      </div>,
      <Routes />,
    ]
  }
}
