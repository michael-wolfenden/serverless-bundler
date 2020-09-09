# @wolfenden/serverless-bundler [![Build Status](https://github.com/michael-wolfenden/serverless-bundler/workflows/npm-publish/badge.svg)](https://github.com/michael-wolfenden/serverless-bundler/actions) [![npm](https://img.shields.io/npm/v/@wolfenden/serverless-bundler.svg)](https://www.npmjs.com/package/@wolfenden/serverless-bundler)

@wolfenden/serverless-bundler is a combination of a
[Serverless Framework](https://www.serverless.com) plugin as well as a CLI that
abstracts away all the packages and configuration for my serverless projects.

Its basically a combination of
[serverless-bundle](https://github.com/AnomalyInnovations/serverless-bundle) and
[kcd-scripts](https://github.com/kentcdodds/kcd-scripts).

It allows you to replace the following packages as well as their associated
configurations with a single reference

```diff
- "eslint"
- "eslint-config-airbnb-base"
- "eslint-config-prettier"
- "eslint-plugin-import"
- "jest"
- "jest-config"
- "lint-staged"
- "prettier"
- "serverless-webpack"
- "webpack"

+ "@wolfenden/serverless-bundler"
```

This is heavily opinionated and is based on my preferred defaults. This project
is mainly to show an example of how you could do this yourself.

---

## Getting Started

Install the `@wolfenden/serverless-bundler` plugin using:

```bash
$ npm install --save-dev @wolfenden/serverless-bundler
$ yarn add @wolfenden/serverless-bundler --dev
```

Then add it to your `serverless.yml`.

```yaml
plugins:
  - '@wolfenden/serverless-bundler'

package:
  individually: true
```

Your lambda functions will now be bundled using the bundled webpack
configuration

The following scripts are also available

```json
"scripts": {
  // formats your files using prettier
  "format": "serverless-bundler format",
  // lints your files using eslint
  "lint": "serverless-bundler lint",
  // executes your tests using jest
  "test": "serverless-bundler test"
},
"husky": {
  "hooks": {
    // runs format and lint on any commited files
    "pre-commit": "serverless-bundler pre-commit"
  }
}
```

## Editor integration

To enabled editor integration you can add the following files to your project

```js
// .prettierrc.js
module.exports = require('@wolfenden/serverless-bundler/prettier')
```

```js
// .eslintrc.js
module.exports = require('@wolfenden/serverless-bundler/eslint')
```

This will ensure that your editor respects the same configuration that
`@wolfenden/serverless-bundler` is using when runngin `lint` and `format`

## Thanks

This plugin would not be possible without the amazing
[serverless-webpack](https://github.com/serverless-heaven/serverless-webpack)
plugin and the ideas and code from
[serverless-bundle](https://github.com/AnomalyInnovations/serverless-bundle) and
[kcd-scripts](https://github.com/kentcdodds/kcd-scripts).
