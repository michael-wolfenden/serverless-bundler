const {defaults} = require('jest-config')
const {fromRoot, hasFile} = require('../utils')

const getPathFromRoot = filename => {
  const startingFromSrcPath = `src/testing/${filename}`
  if (hasFile(startingFromSrcPath)) return fromRoot(startingFromSrcPath)

  const startingFromTestingPath = `testing/${filename}`
  if (hasFile(startingFromTestingPath)) return fromRoot(startingFromTestingPath)

  return null
}

const config = {
  ...defaults,
  roots: [fromRoot('.')],
  testEnvironment: 'node',
  globalSetup: getPathFromRoot('jest-global-setup.js'),
  globalTeardown: getPathFromRoot('jest-global-teardown.js'),
  setupFilesAfterEnv: [getPathFromRoot('jest-setup-files-after-env.js')].filter(
    Boolean,
  ),
}

module.exports = config
