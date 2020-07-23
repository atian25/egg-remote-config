# egg-remote-config

[![NPM version][npm-image]][npm-url]
[![Node.js CI][action-image]][action-url]
[![Test coverage][codecov-image]][codecov-url]


[npm-image]: https://img.shields.io/npm/v/egg-remote-config.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-remote-config
[action-image]: https://github.com/atian25/egg-remote-config/workflows/Node.js%20CI/badge.svg
[action-url]: https://github.com/atian25/egg-remote-config/actions?query=workflow%3A%22Node.js+CI%22
[codecov-image]: https://codecov.io/gh/atian25/egg-remote-config/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/atian25/egg-remote-config

Workaround for egg remote config.

It will load remote config at agent's lifecycle, then write to file, then readFileSync at worker's lifecycle.

## Install

```bash
$ npm i --save egg-remote-config
```

## Usage

```js
// {app_root}/config/plugin.js
exports.remoteConfig = {
  enable: true,
  package: 'egg-remote-config',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.remoteConfig = {
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

<!-- example here -->

## Questions & Suggestions

Please open an issue [here](https://github.com/atian25/egg-remote-config/issues).

## License

[MIT](LICENSE)
