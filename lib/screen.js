"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.screen = exports.toJSON = void 0;var _lodashFirecloud = _interopRequireDefault(require("lodash-firecloud"));
var _cfg = _interopRequireDefault(require("./cfg"));

var _util = require("./util");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}




let toJSON = function () {
  return (0, _util.roundRect)({
    width: exports.screen.width(),
    height: exports.screen.height(),

    available: (0, _util.roundRect)({
      left: exports.screen.available.left(),
      top: exports.screen.available.top(),
      width: exports.screen.available.width(),
      height: exports.screen.available.height() }),


    orientation: {
      angle: exports.screen.orientation.angle(),
      type: exports.screen.orientation.type() },


    osZoomFactorPercentile: _lodashFirecloud.default.round(exports.screen.osZoomFactor() * 100),
    pixelRatioPercentile: _lodashFirecloud.default.round(exports.screen.pixelRatio() * 100) });

};

// current screen | in device px
exports.toJSON = toJSON;let screen = {
  width: (0, _util.throttle)(function () {
    return window.screen.width * screen.osZoomFactor();
  }),

  height: (0, _util.throttle)(function () {
    return window.screen.height * screen.osZoomFactor();
  }),

  available: {
    left: (0, _util.throttle)(function () {
      return window.screen.availLeft * screen.osZoomFactor();
    }),

    top: (0, _util.throttle)(function () {
      return window.screen.availTop * screen.osZoomFactor();
    }),

    width: (0, _util.throttle)(function () {
      return window.screen.availWidth * screen.osZoomFactor();
    }),

    height: (0, _util.throttle)(function () {
      return window.screen.availHeight * screen.osZoomFactor();
    }) },


  orientation: {
    angle: (0, _util.throttle)(function () {
      return window.screen.orientation.angle;
    }),

    type: (0, _util.throttle)(function () {
      return window.screen.orientation.type;
    }) },


  osZoomFactor: (0, _util.throttle)(function () {
    if (!_lodashFirecloud.default.isUndefined(_cfg.default.screen.osZoomFactor)) {
      return _cfg.default.screen.osZoomFactor;
    }

    let osZoomFactor = window.devicePixelRatio / (
    _cfg.default.page.zoomFactor * screen.pixelRatio());
    return _lodashFirecloud.default.round(osZoomFactor, 2);
  }),

  pixelRatio: (0, _util.throttle)(function () {
    if (!_lodashFirecloud.default.isUndefined(_cfg.default.screen.pixelRatio)) {
      return _cfg.default.screen.pixelRatio;
    }

    if (_lodashFirecloud.default.includes(navigator.appVersion, 'Win')) {
      // Windows always has window.devicePixelRatio = 1 at rest
      // i.e. when page zoom is 100% and
      // OS zoom (Display Settings -> Change size...) is also 100%
      return 1;
    }

    let pixelRatio = window.devicePixelRatio / _cfg.default.page.zoomFactor;
    return _lodashFirecloud.default.round(pixelRatio, 2);
  }),

  toJSON: exports.toJSON };exports.screen = screen;var _default = exports.screen;exports.default = _default;

//# sourceMappingURL=screen.js.map