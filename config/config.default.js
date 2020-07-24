'use strict';

/**
 * egg-remote-config default config
 * @member Config#remoteConfig
 * @property {Function} handler - remote logic handler
 * @property {String} savePath - where to save remote config, relative to rundir
 */
exports.remoteConfig = {
  handler: undefined,
  savePath: 'remote_config.json',
};
