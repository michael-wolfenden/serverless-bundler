const slsw = require('serverless-webpack')

const {isLocal} = slsw.lib.webpack

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  mode: isLocal ? 'development' : 'production',
  devtool: isLocal ? 'cheap-module-eval-source-map' : 'source-map',
  stats: {
    modules: false,
    colors: {
      green: '\u001b[32m',
    },
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: require.resolve('html-loader'),
      },
    ],
  },
}
