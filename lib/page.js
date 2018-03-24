'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.page = exports._toJSON = undefined;

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
    x: exports.page.x(),
    y: exports.page.y(),
    width: exports.page.width(),
    height: exports.page.height(),

    zoomFactorPercentile: _lodashFirecloud2.default.round(exports.page.zoomFactor() * 100)
  });
};

// page relative to window (top frame) | in device px
// aka layout viewport, document
let page = exports.page = {
  x: function () {
    return _client2.default.x() - _client2.default.scroll.x();
  },

  y: function () {
    return _client2.default.y() - _client2.default.scroll.y();
  },

  width: (0, _util.throttle)(function () {
    return _lodashFirecloud2.default.max([// same as jQuery(document).width
    document.body.scrollWidth, document.documentElement.scrollWidth, document.body.offsetWidth, document.documentElement.offsetWidth, document.documentElement.clientWidth]) * _screen2.default.osZoomFactor();
  }),

  height: (0, _util.throttle)(function () {
    return _lodashFirecloud2.default.max([// same as jQuery(document).height
    document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.documentElement.clientHeight]) * _screen2.default.osZoomFactor();
  }),

  zoomFactor: function () {
    return _cfg2.default.page.zoomFactor;
  },

  toJSON: exports._toJSON
};

exports.default = exports.page;

//# sourceMappingURL=page.js.map