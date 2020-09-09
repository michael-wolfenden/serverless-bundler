const {defaults} = require('jest-config')
const {fromRoot, hasFile} = require('../utils')

const config = {
  ...defaults,
  roots: [fromRoot('.')],
  testEnvironment: 'node',
  setupFilesAfterEnv: hasFile('tests/setup-env.js')
    ? [fromRoot('tests/setup-env.js')]
    : [],
}

module.exports = config
