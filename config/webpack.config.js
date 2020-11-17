const slsw = require('serverless-webpack')
const {StatsWriterPlugin} = require('webpack-stats-plugin')

const {isLocal} = slsw.lib.webpack
const {
  minimize = true,
  outputStats = false,
  stats = 'normal',
} = slsw.lib.serverless.service.custom.webpack

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  mode: isLocal ? 'development' : 'production',
  devtool: isLocal ? 'cheap-module-eval-source-map' : 'source-map',
  stats,
  resolve: {
    // for performance
    symlinks: false,
  },
  optimization: {
    minimize,
  },

  plugins: [
    ...(outputStats
      ? [
          new StatsWriterPlugin({
            fields: null,
            stats: {chunkModules: true},
          }),
        ]
      : []),
  ],
}
