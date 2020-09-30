const {defaults} = require('jest-config')
const {fromRoot, hasFile} = require('../utils')

const customSetupFile = hasFile('src/testing/setup-jest.js')
  ? [fromRoot('src/testing/setup-jest.js')]
  : []

const config = {
  ...defaults,
  roots: [fromRoot('.')],
  testEnvironment: 'node',
  setupFilesAfterEnv: ['jest-partial', ...customSetupFile],
}

module.exports = config
