"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.shouldThrottle = exports.throttle = exports.roundRect = void 0;var _lodashFirecloud = _interopRequireDefault(require("lodash-firecloud"));
var _cfg = _interopRequireDefault(require("./cfg"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

let roundRect = function (obj, precision) {
  let keys = [
  'x',
  'y',
  'left',
  'top',
  'width',
  'height'];


  _lodashFirecloud.default.forEach(keys, function (key) {
    if (!obj[key]) {
      return;
    }
    obj[key] = _lodashFirecloud.default.round(obj[key], precision);
  });

  return obj;
};exports.roundRect = roundRect;

let throttle = function (fn) {
  let interval = _lodashFirecloud.default.defaultTo(_cfg.default.throttle, 0);
  let throttledFn = _lodashFirecloud.default.onceIn(fn, interval);
  throttledFn.now = fn;
  return throttledFn;
};exports.throttle = throttle;

let shouldThrottle = function (fn) {
  fn.shouldThrottle = true;
  return fn;
};exports.shouldThrottle = shouldThrottle;var _default =

exports;exports.default = _default;

//# sourceMappingURL=util.js.map