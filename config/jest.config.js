const {defaults} = require('jest-config')
const {fromRoot, hasFile} = require('../utils')

const config = {
  ...defaults,
  roots: [fromRoot('.')],
  testEnvironment: 'node',
  setupFilesAfterEnv: hasFile('testing/setup-jest.js')
    ? [fromRoot('testing/setup-jest.js')]
    : [],
}

module.exports = config
