'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.client = exports._toJSON = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _cfg = require('./cfg');

var _cfg2 = _interopRequireDefault(_cfg);

var _screen = require('./screen');

var _screen2 = _interopRequireDefault(_screen);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let _toJSON = exports._toJSON = function () {
  return (0, _util.roundRect)({
    x: exports.client.x(),
    y: exports.client.y(),
    width: exports.client.width(),
    height: exports.client.height(),

    scroll: (0, _util.roundRect)({
      x: exports.client.scroll.x(),
      y: exports.client.scroll.y()
    })
  });
};

// client relative to window | in device px
// aka visual viewport, viewport, client area
let client = exports.client = {
  x: function () {
    return _cfg2.default.client.x;
  },

  y: function () {
    return _cfg2.default.client.y;
  },

  width: (0, _util.maybeThrottle)(function () {
    return window.innerWidth * _screen2.default.osZoomFactor();
  }),

  height: (0, _util.maybeThrottle)(function () {
    return window.innerHeight * _screen2.default.osZoomFactor();
  }),

  scroll: {
    x: (0, _util.maybeThrottle)(function () {
      return window.pageXOffset * _screen2.default.osZoomFactor();
    }),

    y: (0, _util.maybeThrottle)(function () {
      return window.pageYOffset * _screen2.default.osZoomFactor();
    })
  },

  toJSON: exports._toJSON
};

exports.default = client;

//# sourceMappingURL=client.js.map