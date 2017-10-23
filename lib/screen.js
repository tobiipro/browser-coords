'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.screen = exports._toJSON = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _cfg = require('./cfg');

var _cfg2 = _interopRequireDefault(_cfg);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let _toJSON = exports._toJSON = function () {
  return (0, _util.roundRect)({
    width: exports.screen.width(),
    height: exports.screen.height(),

    available: (0, _util.roundRect)({
      left: exports.screen.available.left(),
      top: exports.screen.available.top(),
      width: exports.screen.available.width(),
      height: exports.screen.available.height()
    }),

    orientation: {
      angle: exports.screen.orientation.angle(),
      type: exports.screen.orientation.type()
    },

    osZoomFactorPercentile: _lodash2.default.round(exports.screen.osZoomFactor() * 100),
    pixelRatioPercentile: _lodash2.default.round(exports.screen.pixelRatio() * 100)
  });
};

// current screen | in device px
let screen = exports.screen = {
  width: (0, _util.maybeThrottle)(function () {
    return window.screen.width * exports.screen.osZoomFactor();
  }),

  height: (0, _util.maybeThrottle)(function () {
    return window.screen.height * exports.screen.osZoomFactor();
  }),

  available: {
    left: (0, _util.maybeThrottle)(function () {
      return window.screen.availLeft * exports.screen.osZoomFactor();
    }),

    top: (0, _util.maybeThrottle)(function () {
      return window.screen.availTop * exports.screen.osZoomFactor();
    }),

    width: (0, _util.maybeThrottle)(function () {
      return window.screen.availWidth * exports.screen.osZoomFactor();
    }),

    height: (0, _util.maybeThrottle)(function () {
      return window.screen.availHeight * exports.screen.osZoomFactor();
    })
  },

  orientation: {
    angle: (0, _util.maybeThrottle)(function () {
      return window.screen.orientation.angle;
    }),

    type: (0, _util.maybeThrottle)(function () {
      return window.screen.orientation.type;
    })
  },

  osZoomFactor: (0, _util.maybeThrottle)(function () {
    if (!_lodash2.default.isUndefined(_cfg2.default.screen.osZoomFactor)) {
      return _cfg2.default.screen.osZoomFactor;
    }

    let osZoomFactor = window.devicePixelRatio / (_cfg2.default.page.zoomFactor * exports.screen.pixelRatio());
    return _lodash2.default.round(osZoomFactor, 2);
  }),

  pixelRatio: (0, _util.maybeThrottle)(function () {
    if (!_lodash2.default.isUndefined(_cfg2.default.screen.pixelRatio)) {
      return _cfg2.default.screen.pixelRatio;
    }

    if (_lodash2.default.includes(navigator.appVersion, 'Win')) {
      // Windows always has window.devicePixelRatio = 1 at rest
      // i.e. when page zoom is 100% and
      // OS zoom (Display Settings -> Change size...) is also 100%
      return 1;
    }

    let pixelRatio = window.devicePixelRatio / _cfg2.default.page.zoomFactor;
    return _lodash2.default.round(pixelRatio, 2);
  }),

  toJSON: exports._toJSON
};

exports.default = screen;

//# sourceMappingURL=screen.js.map