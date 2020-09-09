// this allows consumers of this package to enable editor integration
// by adding their own .prettierrc.js containing the following file:
// module.exports = require('@wolfenden/serverless-bundler/prettier')
module.exports = require('./config/.prettierrc.js')
