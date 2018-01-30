import axios from 'axios'

const baseUrl = process.env.API_BASE || ''

const parseUrl = (url, params) => {
  params = params || {}
  const str = Object.keys(params).reduce((result, key) => {
    result += `${key}=${params[key]}&`
    return result
  }, '')
  return `${baseUrl}/api${url}?${str.substr(0, str.length - 1)}`
}

export const get = (url, params) => {
  return new Promise((resolve, reject) => {
    axios.get(parseUrl(url, params))
      .then((resp) => {
        const data = resp.data
        if (data && data.success === true) {
          resolve(data)
        } else {
          reject(data)
        }
      }).catch(reject)
  })
}

export const post = (url, params, data) => {
  return new Promise((resolve, reject) => {
    axios.post(parseUrl(url, params), data)
      .then((resp) => {
        const rData = resp.data
        if (rData && rData.success === true) {
          resolve(rData)
        } else {
          reject(rData)
        }
      }).catch(reject)
  })
}
