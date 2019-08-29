"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.client = exports.toJSON = void 0;var _lodashFirecloud = _interopRequireDefault(require("lodash-firecloud"));
var _cfg = _interopRequireDefault(require("./cfg"));
var _screen = _interopRequireDefault(require("./screen"));

var _util = require("./util");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}




let toJSON = function () {
  return (0, _util.roundRect)({
    cfg: exports.client.cfg,

    x: exports.client.x(),
    y: exports.client.y(),
    width: exports.client.width(),
    height: exports.client.height(),

    isIframe: exports.client.isIframe(),
    scroll: (0, _util.roundRect)({
      x: exports.client.scroll.x(),
      y: exports.client.scroll.y() }) });


};

// client aka visual-viewport/viewport/client-area of the top/iframe
// coordinates in device px relative to browser window
exports.toJSON = toJSON;let client = {
  cfg: _cfg.default.client,

  x: function () {
    return _lodashFirecloud.default.defaultTo(_cfg.default.client.x, 0);
  },

  y: function () {
    return _lodashFirecloud.default.defaultTo(_cfg.default.client.y, 0);
  },

  width: (0, _util.shouldThrottle)(function () {
    return window.innerWidth * _screen.default.osZoomFactor();
  }),

  height: (0, _util.shouldThrottle)(function () {
    return window.innerHeight * _screen.default.osZoomFactor();
  }),

  isIframe: (0, _util.shouldThrottle)(function () {
    return window !== window.top;
  }),

  scroll: {
    x: (0, _util.shouldThrottle)(function () {
      return window.pageXOffset * _screen.default.osZoomFactor();
    }),

    y: (0, _util.shouldThrottle)(function () {
      return window.pageYOffset * _screen.default.osZoomFactor();
    }) },


  toJSON: exports.toJSON };exports.client = client;var _default = exports.client;exports.default = _default;

//# sourceMappingURL=client.js.map