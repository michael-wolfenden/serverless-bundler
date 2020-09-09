const fs = require('fs')
const path = require('path')
const yargs = require('yargs-parser')
const readPkgUp = require('read-pkg-up')

const {packageJson: pkg, path: pkgPath} = readPkgUp.sync({
  cwd: fs.realpathSync(process.cwd()),
})

const appDirectory = path.dirname(pkgPath)

const getProvidedFilePaths = args => {
  const parsedArgs = yargs(args)
  return parsedArgs._
}

const resolveScripts = () => {
  if (pkg.name === '@wolfenden/serverless-bundler') {
    return require.resolve('./').replace(process.cwd(), '.')
  }

  return resolveBin('@wolfenden/serverless-bundler', {
    executable: 'serverless-bundler',
  })
}

const relativePathTo = currentDirectory => relativeFilePath => {
  const absolutePath = path.join(currentDirectory, relativeFilePath)
  const rootDirectory = process.cwd()

  return absolutePath.replace(rootDirectory, '.')
}

const resolveBin = (
  modName,
  {executable = modName, cwd = process.cwd()} = {},
) => {
  let pathFromWhich
  try {
    pathFromWhich = fs.realpathSync(which.sync(executable))
    if (pathFromWhich && pathFromWhich.includes('.CMD')) return pathFromWhich
  } catch (_error) {
    // ignore _error
  }
  try {
    const modPkgPath = require.resolve(`${modName}/package.json`)
    const modPkgDir = path.dirname(modPkgPath)
    const {bin} = require(modPkgPath)
    const binPath = typeof bin === 'string' ? bin : bin[executable]
    const fullPathToBin = path.join(modPkgDir, binPath)
    if (fullPathToBin === pathFromWhich) {
      return executable
    }
    return fullPathToBin.replace(cwd, '.')
  } catch (error) {
    if (pathFromWhich) {
      return executable
    }
    throw error
  }
}

const fromRoot = (...paths) => path.join(appDirectory, ...paths)
const hasFile = (...paths) => fs.existsSync(fromRoot(...paths))

module.exports = {
  getProvidedFilePaths,
  resolveScripts,
  relativePathTo,
  resolveBin,
  fromRoot,
  hasFile,
}
