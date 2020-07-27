'use strict';

// old style without lifecycle
module.exports = app => {
  app.test = {
    foo: app.config.foo,
    sub: app.config.sub,
  };
};
