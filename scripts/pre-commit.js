const args = process.argv.slice(2)
const spawn = require('cross-spawn')
const { fromOwnRoot, resolveBin } = require('../utils')

const config = ['--config', fromOwnRoot('./config/lint-staged.config.js')]
console.log("config", resolveBin('lint-staged'))
const result = spawn.sync(resolveBin('lint-staged'), [...config, ...args], {
  stdio: 'inherit',
})

process.exit(result.status)
