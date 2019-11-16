"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.shouldThrottle = exports.throttle = exports.roundRect = void 0;var _lodashFirecloud = _interopRequireDefault(require("lodash-firecloud"));
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
    if (_lodashFirecloud.default.isUndefined(obj[key])) {
      return;
    }
    obj[key] = _lodashFirecloud.default.round(obj[key], precision);
  });

  return obj;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
exports.roundRect = roundRect;let throttle = function (fn) {
  let interval = _lodashFirecloud.default.defaultTo(_cfg.default.throttle, 0);
  let throttledFn = _lodashFirecloud.default.throttleTrue(fn, interval);
  return throttledFn;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
exports.throttle = throttle;let shouldThrottle = function (fn) {
  let shouldThrottleFn = _lodashFirecloud.default.assign(fn, {
    shouldThrottle: true });

  return shouldThrottleFn;
};exports.shouldThrottle = shouldThrottle;

//# sourceMappingURL=util.js.map