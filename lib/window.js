"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.window2 = exports.toJSON = void 0;var _lodashFirecloud = _interopRequireDefault(require("lodash-firecloud"));
var _cfg = _interopRequireDefault(require("./cfg"));
var _client = _interopRequireDefault(require("./client"));
var _screen = _interopRequireDefault(require("./screen"));

var _util = require("./util");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}




let toJSON = function () {
  return (0, _util.roundRect)({
    x: exports.window2.x(),
    y: exports.window2.y(),
    width: exports.window2.width(),
    height: exports.window2.height(),

    viewport: (0, _util.roundRect)({
      x: exports.window2.viewport.x(),
      y: exports.window2.viewport.y() }) });


};

// window relative to current screen | in device px
exports.toJSON = toJSON;let window2 = {
  x: (0, _util.shouldThrottle)(function () {
    return window.screenX * _screen.default.osZoomFactor();
  }),

  y: (0, _util.shouldThrottle)(function () {
    return window.screenY * _screen.default.osZoomFactor();
  }),

  width: (0, _util.shouldThrottle)(function () {
    return window.outerWidth * _screen.default.osZoomFactor();
  }),

  height: (0, _util.shouldThrottle)(function () {
    return window.outerHeight * _screen.default.osZoomFactor();
  }),

  viewport: {
    x: function () {
      return _cfg.default.window.viewport.x * _screen.default.osZoomFactor();
    },

    y: function () {
      return _cfg.default.window.viewport.y * _screen.default.osZoomFactor();
    } },


  borderSize: function () {
    // assume the window bottom border is the same as the horizontal ones
    // see Window 7 window borders, or Windows 10 shadow borders
    // OSX, etc may have none
    let widthDiff =
    window2.width() - _client.default.x() -
    _client.default.width();

    if (widthDiff > 25) {
      // assume Developer Tools is open vertically, and widthDiff cannot be trusted
      return 0;
    }

    // assume border on both left and right
    return _lodashFirecloud.default.max([
    0,
    _lodashFirecloud.default.floor(widthDiff / 2)]);

  },

  toJSON: exports.toJSON };exports.window2 = window2;var _default = exports.window2;exports.default = _default;

//# sourceMappingURL=window.js.map