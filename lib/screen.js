"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.screen = exports.toJSON = exports.getOsZoomFactor = void 0;var _lodashFirecloud = _interopRequireDefault(require("lodash-firecloud"));
var _cfg = _interopRequireDefault(require("./cfg"));

var _util = require("./util");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}











// NOTE function taken out of the 'screen' variable assignment to assist typescript into inferring types
let getOsZoomFactor = function () {
  if (_lodashFirecloud.default.isDefined(_cfg.default.screen.osZoomFactor)) {
    return _cfg.default.screen.osZoomFactor;
  }

  if (_lodashFirecloud.default.includes(navigator.appVersion, 'Win')) {
    // it's the same thing as DPI zoom (usually between 100-200%%)

    // not using pageCoords.zoomFactor() to avoid circular dependency
    let pageZoomFactor = _lodashFirecloud.default.defaultTo(_cfg.default.page.zoomFactor, 1);
    let pixelRatio = window.devicePixelRatio / pageZoomFactor;
    return _lodashFirecloud.default.round(pixelRatio, 2);
  }

  return 1;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
exports.getOsZoomFactor = getOsZoomFactor;let toJSON = function () {
  return (0, _util.roundRect)({
    cfg: exports.screen.cfg,

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

// current screen
// coordinates in device px
exports.toJSON = toJSON;let screen = {
  cfg: _cfg.default.screen,

  width: (0, _util.shouldThrottle)(function () {
    return window.screen.width * exports.getOsZoomFactor();
  }),

  height: (0, _util.shouldThrottle)(function () {
    return window.screen.height * exports.getOsZoomFactor();
  }),

  available: {
    left: (0, _util.shouldThrottle)(function () {
      return window.screen.availLeft * exports.getOsZoomFactor();
    }),

    top: (0, _util.shouldThrottle)(function () {
      return window.screen.availTop * exports.getOsZoomFactor();
    }),

    width: (0, _util.shouldThrottle)(function () {
      return window.screen.availWidth * exports.getOsZoomFactor();
    }),

    height: (0, _util.shouldThrottle)(function () {
      return window.screen.availHeight * exports.getOsZoomFactor();
    }) },


  orientation: {
    angle: (0, _util.shouldThrottle)(function () {
      return _lodashFirecloud.default.get(window.screen, 'orientation.angle');
    }),

    type: (0, _util.shouldThrottle)(function () {
      return _lodashFirecloud.default.get(window.screen, 'orientation.type');
    }) },


  osZoomFactor: (0, _util.shouldThrottle)(function () {
    return exports.getOsZoomFactor();
  }),

  pixelRatio: (0, _util.shouldThrottle)(function () {
    if (_lodashFirecloud.default.isDefined(_cfg.default.screen.pixelRatio)) {
      return _cfg.default.screen.pixelRatio;
    }

    // not using pageCoords.zoomFactor() to avoid circular dependency
    let pageZoomFactor = _lodashFirecloud.default.defaultTo(_cfg.default.page.zoomFactor, 1);
    let pixelRatio = window.devicePixelRatio / pageZoomFactor;
    return _lodashFirecloud.default.round(pixelRatio, 2);
  }),

  toJSON: exports.toJSON };exports.screen = screen;var _default = exports.screen;exports.default = _default;

//# sourceMappingURL=screen.js.map