let args = process.argv.slice(2)
const spawn = require('cross-spawn')
const {
  fromAppRoot,
  fromOwnRoot,
  resolveBin,
  getProvidedFilePaths,
} = require('../utils')

const config = ['--config', fromOwnRoot('./config/.eslintrc.js')]
const ignore = ['--ignore-path', fromOwnRoot('./config/eslintignore')]
const fix = ['--fix']

// see: https://github.com/eslint/eslint/issues/13385
const resolve = ['--resolve-plugins-relative-to', fromAppRoot('.')]

const filesGiven = getProvidedFilePaths(args)
const glob = filesGiven.length === 0 ? ['.'] : []

if (filesGiven) {
  // we need to take all the flag-less arguments (the files that should be linted)
  // and filter out the ones that aren't js files. Otherwise json or css files
  // may be passed through
  args = args.filter((a) => !filesGiven.includes(a) || /\.js$/.test(a))
}

const result = spawn.sync(
  resolveBin('eslint'),
  [...config, ...ignore, ...resolve, ...fix, ...args, ...glob],
  { stdio: 'inherit' },
)

process.exit(result.status)
