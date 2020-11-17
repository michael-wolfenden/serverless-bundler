const fs = require('fs')
const path = require('path')
const yargs = require('yargs-parser')
const readPkgUp = require('read-pkg-up')
const witch = require('witch')

const { packageJson, path: packageJsonPath } = readPkgUp.sync({
  cwd: fs.realpathSync(process.cwd()),
})

const appDirectory = path.dirname(packageJsonPath)

const fromAppRoot = (relativePath) => path.resolve(appDirectory, relativePath)

const fromOwnRoot = (relativePath) => path.resolve(__dirname, relativePath)

const resolveBin = (bin, script = bin) => witch(bin, script)

const getProvidedFilePaths = (args) => {
  const { _ } = yargs(args)
  return _
}

const resolveScripts = () =>
  resolveBin('@wolfenden/serverless-bundler', 'serverless-bundler')

module.exports = {
  packageJson,
  fromAppRoot,
  fromOwnRoot,
  resolveBin,
  getProvidedFilePaths,
  resolveScripts,
}
