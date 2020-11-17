const args = process.argv.slice(2)
const { fromOwnRoot } = require('../utils')

const config = ['--config', fromOwnRoot('./config/jest.config.js')]

process.env.NODE_ENV = 'test'

require('jest').run([...config, ...args])
