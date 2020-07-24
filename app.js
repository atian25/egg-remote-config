'use strict';

const path = require('path');
const fs = require('fs');
const extend = require('extend2');

module.exports = class AppBootHook {
  constructor(app) {
    this.app = app;
    this.logger = app.logger;
  }

  configWillLoad() {
    const { savePath } = this.app.config.remoteConfig;
    const filePath = path.resolve(this.app.config.rundir, savePath);

    this.logger.info(`[RemoteConfig] loading remote config from ${filePath}`);

    try {
      const result = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      extend(true, this.app.config, result);
    } catch (err) { /* istanbul ignore next */
      this.logger.warn(`[RemoteConfig] load ${filePath} fail: ${err.message}`);
    }
  }
};
