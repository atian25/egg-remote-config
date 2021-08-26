'use strict';

const mock = require('egg-mock');
const assert = require('assert');
const asserFile = require('assert-file');
const path = require('path');
const { rimraf, sleep } = require('mz-modules');
const request = require('supertest');

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
    asserFile(path.join(app.config.rundir, 'remote_config.json'));

    // make sure test-plugin is load before remote-config
    const plugins = app.loader.orderPlugins.map(it => it.name);
    const testIndex = plugins.indexOf('test');
    const remoteIndex = plugins.indexOf('remoteConfig');
    assert(testIndex < remoteIndex && testIndex !== -1 && remoteIndex !== -1);

    // then check test-plugin use the newest config from remote-config
    assert(app.test.foo === 'egg-remote-config');
    assert(app.test.sub.a === 'b');
  });
});

describe('app worker reload', () => {
  let app;
  before(async () => {
    app = mock.cluster({
      baseDir: 'example',
      workers: 4,
    });
    await app.ready();
  });

  after(() => app.close());

  it('should ok after reload', async () => {
    const res = await request(app.callback()).get('/config').expect(200);
    assert(res.body.foo === 'egg-remote-config');
    assert(res.body.sub.a === 'b');
    app.process.send({
      to: 'master',
      action: 'reload-worker',
    });
    await sleep(20000);
    const res2 = await request(app.callback()).get('/config').expect(200);
    assert(res2.body.foo === 'egg-remote-config');
    assert(res2.body.sub.a === 'b');
  });
});
