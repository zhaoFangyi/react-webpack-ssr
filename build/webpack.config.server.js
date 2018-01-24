const path = require('path')
const baseConfig = require('./webpack.base')
const webpackMerge = require('webpack-merge')

module.exports = webpackMerge(baseConfig, {
  target: 'node',
  entry: {
    app: path.join(__dirname + '/../client/server-entry.js')
  },
  // warning: there are multiple mobx instances active,this might lead to unexpected results--webpack 打包的时候每份新的代码都有一份mobx实例
  externals: Object.keys(require('../package.json').dependencies),
  output: {
    filename: 'server-entry.js',
    libraryTarget: 'commonjs2'
  }
})
