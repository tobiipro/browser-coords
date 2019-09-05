"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.page = exports.toJSON = void 0;var _lodashFirecloud = _interopRequireDefault(require("lodash-firecloud"));
var _cfg = _interopRequireDefault(require("./cfg"));
var _client = _interopRequireDefault(require("./client"));
var _screen = _interopRequireDefault(require("./screen"));

var _util = require("./util");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}




let toJSON = function () {
  return (0, _util.roundRect)({
    cfg: exports.page.cfg,

    x: exports.page.x(),
    y: exports.page.y(),
    width: exports.page.width(),
    height: exports.page.height(),

    url: window.location.href,
    zoomFactorPercentile: _lodashFirecloud.default.round(exports.page.zoomFactor() * 100) });

};

// page aka layout viewport, document
// coordinates in device px relative to client
exports.toJSON = toJSON;let page = {
  cfg: _cfg.default.page,

  x: function () {
    return 0 - _client.default.scroll.x();
  },

  y: function () {
    return 0 - _client.default.scroll.y();
  },

  width: (0, _util.shouldThrottle)(function () {
    return _lodashFirecloud.default.max([// same as jQuery(document).width
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth]) *
    _screen.default.osZoomFactor();
  }),

  height: (0, _util.shouldThrottle)(function () {
    return _lodashFirecloud.default.max([// same as jQuery(document).height
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.documentElement.clientHeight]) *
    _screen.default.osZoomFactor();
  }),

  zoomFactor: function () {
    return _lodashFirecloud.default.defaultTo(_cfg.default.page.zoomFactor, 1);
  },

  toJSON: exports.toJSON };exports.page = page;var _default = exports.page;exports.default = _default;

//# sourceMappingURL=page.js.map