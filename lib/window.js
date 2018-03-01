'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.window2 = exports._toJSON = undefined;

var _lodashFirecloud = require('lodash-firecloud');

var _lodashFirecloud2 = _interopRequireDefault(_lodashFirecloud);

var _cfg = require('./cfg');

var _cfg2 = _interopRequireDefault(_cfg);

var _client = require('./client');

var _client2 = _interopRequireDefault(_client);

var _screen = require('./screen');

var _screen2 = _interopRequireDefault(_screen);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let _toJSON = exports._toJSON = function () {
  return (0, _util.roundRect)({
    x: exports.window2.x(),
    y: exports.window2.y(),
    width: exports.window2.width(),
    height: exports.window2.height(),

    viewport: (0, _util.roundRect)({
      x: exports.window2.viewport.x(),
      y: exports.window2.viewport.y()
    })
  });
};

// window relative to current screen | in device px
let window2 = exports.window2 = {
  x: (0, _util.throttle)(function () {
    return window.screenX * _screen2.default.osZoomFactor();
  }),

  y: (0, _util.throttle)(function () {
    return window.screenY * _screen2.default.osZoomFactor();
  }),

  width: (0, _util.throttle)(function () {
    return window.outerWidth * _screen2.default.osZoomFactor();
  }),

  height: (0, _util.throttle)(function () {
    return window.outerHeight * _screen2.default.osZoomFactor();
  }),

  viewport: {
    x: function () {
      return _cfg2.default.window.viewport.x * _screen2.default.osZoomFactor();
    },

    y: function () {
      return _cfg2.default.window.viewport.y * _screen2.default.osZoomFactor();
    }
  },

  borderSize: function () {
    // assume the window bottom border is the same as the horizontal ones
    // see Window 7 window borders, or Windows 10 shadow borders
    // OSX, etc may have none
    let widthDiff = exports.window2.width() - _client2.default.x() - _client2.default.width();

    if (widthDiff > 25) {
      // assume Developer Tools is open vertically, and widthDiff cannot be trusted
      return 0;
    }

    // assume border on both left and right
    return _lodashFirecloud2.default.max([0, _lodashFirecloud2.default.floor(widthDiff / 2)]);
  },

  toJSON: exports._toJSON
};

exports.default = window2;

//# sourceMappingURL=window.js.map