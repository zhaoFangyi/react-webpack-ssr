const axios = require('axios')
const querystring = require('query-string')

const baseUrl = 'https://cnodejs.org/api/v1'

module.exports = function (req, res, next) {
  console.log(req.path)
  const path = req.path
  const user = req.session.user || {}
  const needAccessToken = req.query.needAccessToken
  
  if (needAccessToken && !user.accessToken) {
    res.status(401).send({
      success: false,
      msg: 'need login'
    })
  }
  // 针对GET请求的时候，使用query携带accessToken
  const query = Object.assign({}, req.query, {
    accesstoken: (needAccessToken && req.method === 'GET') ? user.accessToken : ''
  })
  if (query.needAccessToken) delete query.needAccessToken
  
  axios(`${baseUrl}${path}`, {
    method: req.method,
    params: query,
    // {'accesstoken': 'xxx} ==> 'accesstoken=xxx' 形式，类似formdata
    data: querystring.stringify(Object.assign({}, req.body, {
      // 针对POST请求，使用body携带accessToken
      accesstoken: (needAccessToken && req.method === 'POST') ? user.accessToken : ''
    })),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(resq => {
    if (resq.status === 200) {
      res.send(resq.data)
    } else {
      res.status(resq.status).send(resq.data)
    }
  }).catch(err => {
    if (err.response) {
      res.status(500).send(err.response.data)
    } else {
      res.status(500).send({
        success: false,
        msg: '未知错误'
      })
    }
  })
}
