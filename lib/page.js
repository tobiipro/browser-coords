"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.page = exports.toJSON = void 0;var _lodashFirecloud = _interopRequireDefault(require("lodash-firecloud"));
var _cfg = _interopRequireDefault(require("./cfg"));
var _client = _interopRequireDefault(require("./client"));
var _screen = _interopRequireDefault(require("./screen"));

var _util = require("./util");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}




let toJSON = function () {
  return (0, _util.roundRect)({
    x: exports.page.x(),
    y: exports.page.y(),
    width: exports.page.width(),
    height: exports.page.height(),

    zoomFactorPercentile: _lodashFirecloud.default.round(exports.page.zoomFactor() * 100) });

};

// page relative to window (top frame) | in device px
// aka layout viewport, document
exports.toJSON = toJSON;let page = {
  x: function () {
    return _client.default.x() - _client.default.scroll.x();
  },

  y: function () {
    return _client.default.y() - _client.default.scroll.y();
  },

  width: (0, _util.throttle)(function () {
    return _lodashFirecloud.default.max([// same as jQuery(document).width
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth]) *
    _screen.default.osZoomFactor();
  }),

  height: (0, _util.throttle)(function () {
    return _lodashFirecloud.default.max([// same as jQuery(document).height
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.documentElement.clientHeight]) *
    _screen.default.osZoomFactor();
  }),

  zoomFactor: function () {
    return _cfg.default.page.zoomFactor;
  },

  toJSON: exports.toJSON };exports.page = page;var _default = exports.page;exports.default = _default;

//# sourceMappingURL=page.js.map