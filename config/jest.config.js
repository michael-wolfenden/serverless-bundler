const {defaults} = require('jest-config')
const {fromAppRoot, packageJson} = require('../utils')

const config = {
  ...defaults,
  rootDir: fromAppRoot('.'),
  testEnvironment: 'node',
}

const overrides = {...packageJson.jest}
const supportedKeys = [
  'collectCoverageFrom',
  'coverageReporters',
  'coverageThreshold',
  'extraGlobals',
  'globalSetup',
  'globalTeardown',
  'moduleNameMapper',
  'reporters',
  'resetMocks',
  'resetModules',
  'setupFilesAfterEnv',
  'snapshotSerializers',
  'testResultsProcessor',
  'testSequencer',
  'transform',
  'transformIgnorePatterns',
  'watchPathIgnorePatterns',
]

if (overrides) {
  supportedKeys.forEach(key => {
    // eslint-disable-next-line no-prototype-builtins
    if (overrides.hasOwnProperty(key)) {
      if (Array.isArray(config[key]) || typeof config[key] !== 'object') {
        // for arrays or primitive types, directly override the config key
        config[key] = overrides[key]
      } else {
        // for object types, extend gracefully
        config[key] = {...config[key], ...overrides[key]}
      }
    }
  })
}

module.exports = config
