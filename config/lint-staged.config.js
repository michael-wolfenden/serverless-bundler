const {resolveScripts} = require('../utils')

const scripts = resolveScripts()

module.exports = {
  '*.+(js|jsx|json|yml|yaml|css|less|scss|ts|tsx|md|graphql|mdx|vue)': [
    `${scripts} format`,
    `${scripts} lint`,
  ],
}
