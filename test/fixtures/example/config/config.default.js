'use strict';

exports.keys = '123456';

exports.foo = 'foo';

exports.sub = {
  a: 'a',
};

exports.remoteConfig = {
  async handler(agent) {
    // fetch remote config
    const { data } = await agent.curl('https://github.com/atian25/egg-remote-config/raw/master/package.json', {
      dataType: 'json',
      contentType: 'json',
      followRedirect: true,
    });

    return {
      foo: data.name,
      sub: {
        a: 'b',
      },
    };
  },
};
