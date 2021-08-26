'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/config', controller.test.index);
};
