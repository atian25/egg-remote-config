'use strict';

const mock = require('egg-mock');

describe('test/remote-config.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/remote-config-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, remoteConfig')
      .expect(200);
  });
});
