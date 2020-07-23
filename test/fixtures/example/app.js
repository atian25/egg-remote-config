'use strict';

const path = require('path');
const assertFile = require('assert-file');

module.exports = class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  configDidLoad() {
    const { savePath } = this.app.config.remoteConfig;
    const filePath = path.resolve(this.app.config.rundir, savePath);

    assertFile(filePath);
  }
};
