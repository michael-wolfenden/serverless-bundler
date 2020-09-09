const path = require('path')
const args = process.argv.slice(2)
const spawn = require('cross-spawn')
const {resolveBin, getProvidedFilePaths} = require('../utils')

const absolutePath = file => path.join(__dirname, file)
const relativePathTo = file => absolutePath(file).replace(process.cwd(), '.')

const config = ['--config', relativePathTo('../config/.prettierrc.js')]
const ignore = ['--ignore-path', relativePathTo('../config/prettierignore')]
const write = ['--write']

const providedFilePaths = getProvidedFilePaths(args)
const glob =
  providedFilePaths.length === 0 ? ['**/*.+(js|json|md|yml|css|html)'] : []

// this ensures that when running format as a pre-commit hook and we get
// the full file path, we make that non-absolute so it is treated as a glob,
// This way the prettierignore will be applied
const relativeFilePaths = providedFilePaths.map(filePath =>
  filePath.replace(`${process.cwd()}/`, ''),
)

const result = spawn.sync(
  resolveBin('prettier'),
  [...config, ...ignore, ...write, ...glob, ...relativeFilePaths],
  {stdio: 'inherit'},
)

process.exit(result.status)
