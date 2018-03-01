'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.throttle = exports.roundRect = undefined;

var _lodashFirecloud = require('lodash-firecloud');

var _lodashFirecloud2 = _interopRequireDefault(_lodashFirecloud);

var _cfg = require('./cfg');

var _cfg2 = _interopRequireDefault(_cfg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/prefer-default-export */

let roundRect = exports.roundRect = function (obj, precision) {
  let keys = ['x', 'y', 'left', 'top', 'width', 'height'];

  _lodashFirecloud2.default.forEach(keys, function (key) {
    if (!obj[key]) {
      return;
    }
    obj[key] = _lodashFirecloud2.default.round(obj[key], precision);
  });

  return obj;
};

let throttle = exports.throttle = function (fn) {
  let throttledFn = _lodashFirecloud2.default.throttle(fn, _cfg2.default.throttle);
  throttledFn.now = fn;
  return throttledFn;
};

//# sourceMappingURL=util.js.map