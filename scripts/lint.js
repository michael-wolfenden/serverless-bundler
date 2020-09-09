const path = require('path')
let args = process.argv.slice(2)
const spawn = require('cross-spawn')

const {resolveBin, getProvidedFilePaths} = require('../utils')

const absolutePath = file => path.join(__dirname, file)
const relativePathTo = file => absolutePath(file).replace(process.cwd(), '.')

const config = ['--config', relativePathTo('../config/.eslintrc.js')]
const ignore = ['--ignore-path', relativePathTo('../config/prettierignore')]
const fix = ['--fix']

const filesGiven = getProvidedFilePaths(args)
const glob = filesGiven.length === 0 ? ['.'] : []

if (filesGiven) {
  // we need to take all the flag-less arguments (the files that should be linted)
  // and filter out the ones that aren't js files. Otherwise json or css files
  // may be passed through
  args = args.filter(a => !filesGiven.includes(a) || /\.js$/.test(a))
}

const result = spawn.sync(
  resolveBin('eslint'),
  [...config, ...ignore, ...fix, ...args, ...glob],
  {stdio: 'inherit'},
)

process.exit(result.status)
