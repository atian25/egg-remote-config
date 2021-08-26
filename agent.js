'use strict';

const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const rimraf = require('rimraf');
const writeFile = promisify(fs.writeFile);
const mkdirp = promisify(fs.mkdir);
const del = promisify(rimraf);

module.exports = class AgentBootHook {
  constructor(agent) {
    this.agent = agent;
    this.logger = agent.logger;
    this.filePath = path.resolve(agent.config.rundir, agent.config.remoteConfig.savePath);
  }

  async willReady() {
    const { handler } = this.agent.config.remoteConfig;

    /* istanbul ignore else */
    if (handler) {
      this.logger.info(`[RemoteConfig] loading remote config and save to ${this.filePath}`);
      const result = await handler(this.agent);
      await mkdirp(path.dirname(this.filePath), { recursive: true });
      await del(this.filePath);
      await writeFile(this.filePath, JSON.stringify(result || /* istanbul ignore next */ {}, null, 2), 'utf-8');
    }
  }

  async beforeClose() {
    await del(this.filePath);
  }
};
