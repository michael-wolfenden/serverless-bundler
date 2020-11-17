const path = require('path')
const ServerlessWebpack = require('serverless-webpack')

const getConfig = (servicePath, bundlerOptions) => {
  const pathToWebpackConfig = `${path.relative(
    servicePath,
    __dirname,
  )}/config/webpack.config.js`

  return {
    webpack: {
      packager: 'yarn',
      excludeFiles: '**/{index.yml,index.spec.js}',
      webpackConfig: pathToWebpackConfig,
      ...bundlerOptions,
      // if we are outputting stats, we probably want to
      // keep the webpack folder so we can analyze them
      ...(bundlerOptions.outputStats && {
        keepOutputDirectory: true,
      }),
    },
  }
}

class ServerlessPlugin extends ServerlessWebpack {
  constructor(serverless, options) {
    super(serverless, options)

    this.serverless = serverless
    this.options = options

    const {
      custom: {webpack = null, serverless_bundler = {}} = {},
    } = this.serverless.service

    this.hooks['before:webpack:validate:validate'] = function validate() {
      if (webpack) {
        throw new Error(
          'serverless-webpack config detected in serverless.yml. serverless-bundle is not compatible with serverless-webpack.',
        )
      }

      this.serverless.service.custom = getConfig(
        this.serverless.config.servicePath,
        serverless_bundler,
      )
    }.bind(this)
  }
}

module.exports = ServerlessPlugin
