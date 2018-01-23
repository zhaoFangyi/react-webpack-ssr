import React from 'react'
import axios from 'axios'

/* eslint-disable */
export default class ApiTest extends React.Component {
  constructor() {
    super()
    this.getTopics = this.getTopics.bind(this)
    this.login = this.login.bind(this)
    this.markAll = this.markAll.bind(this)
  }
  getTopics() {
    axios.get('/api/topics')
      .then(resp => {
        console.log(resp)
      })
      .catch(err => {
        console.log(err)
      })
  }
  login() {
    axios.post('/api/user/login', {
      accessToken: ''
    })
      .then(resp => {
        console.log(resp)
      })
      .catch(err => {
        console.log(err)
      })
  }
  markAll() {
    axios.post('/api/message/mark_all?needAccessToken=true')
      .then(resp => {
        console.log(resp)
      })
      .catch(err => {
        console.log(err)
      })
  }
  componentDidMount() {
    // do something here
  }
  render() {
    return (
      <div>
        <button onClick={this.getTopics}>topics</button>
        <button onClick={this.login}>login</button>
        <button onClick={this.markAll}>markAll</button>
      </div>
    )
  }
}
/* eslint-enable */
