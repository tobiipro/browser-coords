"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.throttle = exports.roundRect = void 0;

var _lodashFirecloud = _interopRequireDefault(require("lodash-firecloud"));

var _cfg = _interopRequireDefault(require("./cfg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/prefer-default-export */
let roundRect = function (obj, precision) {
  let keys = ['x', 'y', 'left', 'top', 'width', 'height'];

  _lodashFirecloud.default.forEach(keys, function (key) {
    if (!obj[key]) {
      return;
    }

    obj[key] = _lodashFirecloud.default.round(obj[key], precision);
  });

  return obj;
};

exports.roundRect = roundRect;

let throttle = function (fn) {
  let throttledFn = _lodashFirecloud.default.throttle(fn, _cfg.default.throttle);

  throttledFn.now = fn;
  return throttledFn;
};

exports.throttle = throttle;

//# sourceMappingURL=util.js.map