# eslint-plugin-filename-rules

Adds an ESLint rule to enforce filename conventions for linted files. Allows different options for different file extensions. Supports custom regular expressions.

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![License: MIT][license-image]][license-url]

## Installation

```bash
$ npm install -D @maintained/eslint-plugin-filename-rules
```

## Old style config

Add it to your `.eslintrc.js`:

```js
module.exports = {
  plugins: ["@maintained/filename-rules"],
  rules: {
    "@maintained/filename-rules/match": [2, "camelcase"],
  },
};
```

## Flat config

```js
import { plugin as filenameRules } from '@maintained/eslint-plugin-filename-rules';

{
  plugins: {
    'filename-rules': filenameRules,
  },
  rules: {
    'filename-rules/match': [2, 'camelcase']
  }
}
```

## Plugin Options

The following built-in values are supported: `pascalcase`/`PascalCase`, `camelcase`/`camelCase`, `snakecase`/`snake_case`, `kebabcase`/`kebab-case`. You can also provide your own regex:

```js
...
'filename-rules/match': [2, /^([a-z]+-)*[a-z]+(?:\..*)?$/],
...
```

You can also specify different options for different file extensions. In this case the plugin will only check files with extensions you explicitly provided:

```js
...
'filename-rules/match': [2, { '.js': 'camelCase', '.ts': /^([a-z]+-)*[a-z]+(?:\..*)?$/ }],
...
```

You can use the `includePath: true` option to have the pattern matched against the full file path (instead of only the file basename):

```js
...
'filename-rules/match': [2, { includePath: true, pattern: /^([a-z]+-)*[a-z]+(?:\..*)?$/ }],
...
```

The inverse rule `not-match` checks that the files do NOT match the given pattern. Supports all the same options:

```js
...
'filename-rules/not-match': [2, 'camelCase'],
...
```

## License

MIT

[npm-image]: https://img.shields.io/npm/v/%40maintained/eslint-plugin-filename-rules.svg?style=flat-square
[npm-url]: https://npmjs.org/package/%40maintained/eslint-plugin-filename-rules
[downloads-image]: https://img.shields.io/npm/dm/%40maintained%2Feslint-plugin-filename-rules
[downloads-url]: https://npmjs.org/package/@maintained/eslint-plugin-filename-rules
[license-image]: https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square
[license-url]: https://opensource.org/licenses/MIT
