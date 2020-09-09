const path = require('path')
let args = process.argv.slice(2)

const absolutePath = file => path.join(__dirname, file)
const relativePathTo = file => absolutePath(file).replace(process.cwd(), '.')

const config = ['--config', relativePathTo('../config/jest.config.js')]

process.env.NODE_ENV = 'test'

require('jest').run([...config, ...args])
