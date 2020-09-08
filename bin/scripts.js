#!/usr/bin/env node
const spawn = require('cross-spawn')

process.on('unhandledRejection', (err) => {
  throw err
})

const availableScripts = ['format', 'lint', 'pre-commit', 'test']
const [script, ...scriptArguments] = process.argv.slice(2)

if (availableScripts.includes(script)) {
  const scriptPath = require.resolve(`../scripts/${script}`)
  const spawnArguments = [scriptPath, ...scriptArguments]

  const result = spawn.sync(process.execPath, spawnArguments, {
    stdio: 'inherit',
  })

  if (result.signal) {
    console.error(`The script ${script} failed`)
    process.exit(1)
  } else {
    process.exit(result.status)
  }
} else {
  console.error(`Unknown script "${script}".`)
}
