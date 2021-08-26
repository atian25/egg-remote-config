'use strict';

const { Controller } = require('egg');

class TestController extends Controller {
  async index() {
    const data = {
      foo: this.config.foo,
      sub: this.config.sub,
    };
    this.ctx.body = data;
  }
}

module.exports = TestController;
