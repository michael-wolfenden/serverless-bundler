const {defaults} = require('jest-config')
const {fromRoot, hasFile} = require('../utils')

const customSetupFile = hasFile('testing/setup-jest.js')
  ? [fromRoot('testing/setup-jest.js')]
  : []

const config = {
  ...defaults,
  roots: [fromRoot('.')],
  testEnvironment: 'node',
  setupFilesAfterEnv: ['jest-partial', ...customSetupFile],
}

module.exports = config
