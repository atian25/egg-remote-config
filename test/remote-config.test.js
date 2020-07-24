'use strict';

const mock = require('egg-mock');
const assert = require('assert');
const asserFile = require('assert-file');
const path = require('path');
const { rimraf, sleep } = require('mz-modules');

describe('test/remote-config.test.js', () => {
  let app;
  before(async () => {
    app = mock.app({
      baseDir: 'example',
    });
    await rimraf(path.join(__dirname, 'fixtures/example/run'));
    await app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should works', async () => {
    assert(app.config.foo === 'egg-remote-config');
    assert(app.config.sub.a === 'b');
    // for win
    await sleep('1s');
    asserFile.fail(path.join(app.config.rundir, 'remote_config.json'));
  });
});
