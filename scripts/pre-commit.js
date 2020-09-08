const path = require('path')
const args = process.argv.slice(2)
const spawn = require('cross-spawn')
const { resolveBin } = require('../utils')

const absolutePath = (file) => path.join(__dirname, file)
const relativePathTo = (file) => absolutePath(file).replace(process.cwd(), '.')

const config = ['--config', relativePathTo('../config/lint-staged.config.js')]

const result = spawn.sync(resolveBin('lint-staged'), [...config, ...args], {
  stdio: 'inherit',
})

process.exit(result.status)
