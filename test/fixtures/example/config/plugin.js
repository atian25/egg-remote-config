'use strict';

const path = require('path');

exports.static = false;

exports.test = {
  path: path.join(__dirname, '../../test-plugin'),
};
