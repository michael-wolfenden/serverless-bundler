const slsw = require('serverless-webpack')

const {isLocal} = slsw.lib.webpack

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  mode: isLocal ? 'development' : 'production',
  devtool: isLocal ? 'cheap-module-eval-source-map' : 'source-map',
  stats: 'errors-only',
  resolve: {
    // for performance
    symlinks: false,
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
