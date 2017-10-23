'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.throttleDeeply = exports.maybeThrottle = exports.roundRect = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let roundRect = exports.roundRect = function (obj, precision) {
  let keys = ['x', 'y', 'left', 'top', 'width', 'height'];

  _lodash2.default.forEach(keys, function (key) {
    if (!obj[key]) {
      return;
    }
    obj[key] = _lodash2.default.round(obj[key], precision);
  });

  return obj;
}; /* eslint-disable import/prefer-default-export */

let maybeThrottle = exports.maybeThrottle = function (fn) {
  fn.maybeThrottle = true;
  return fn;
};

let deeply = function (fn) {
  return function (obj, iteratee) {
    return _lodash2.default.mapValues(obj, function (v, _name) {
      return _lodash2.default.isPlainObject(v) ? deeply(fn)(v, iteratee) : fn(v, iteratee);
    });
  };
};

let throttleDeeply = exports.throttleDeeply = function (obj, wait) {
  return exports.deeply(function (fn) {
    if (!_lodash2.default.isFunction(fn) || !fn.maybeThrottle) {
      return fn;
    }

    return _lodash2.default.throttle(fn, wait);
  })(obj);
};

//# sourceMappingURL=util.js.map