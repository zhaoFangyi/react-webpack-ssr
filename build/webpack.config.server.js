const path = require('path')

module.exports = {
  target: 'node',
  entry: {
    app: path.join(__dirname + '/../client/server-entry.js')
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'server-entry.js',
    publicPath: '/public/',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /.(js|jsx)$/,
        loader: "eslint-loader",
        exclude: [
          path.resolve(__dirname, '../node_modules')
        ]
      },
      {
        test: /.jsx$/,
        loader: "babel-loader"
      },
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude:[
          path.join(__dirname, '../node_modules')
        ]
      }
    ]
  }
}