'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.window = exports.screen = exports.page = exports.client = exports.cfg = exports.init = exports._onTouchEvent = exports._onMouseEvent = exports._guestimateV = exports._guestimateH = exports._setClient = exports._touchEventNames = exports._mouseEventNames = exports._passive = undefined;

var _lodashFirecloud = require('lodash-firecloud');

var _lodashFirecloud2 = _interopRequireDefault(_lodashFirecloud);

var _cfg = require('./cfg');

var _cfg2 = _interopRequireDefault(_cfg);

var _client = require('./client');

var _client2 = _interopRequireDefault(_client);

var _page = require('./page');

var _page2 = _interopRequireDefault(_page);

var _window = require('./window');

var _window2 = _interopRequireDefault(_window);

var _screen = require('./screen');

var _screen2 = _interopRequireDefault(_screen);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let _passive = exports._passive = {
  capture: true,
  passive: true
};

let _mouseEventNames = exports._mouseEventNames = ['click', 'dblclick', 'mousemove', 'wheel'];

let _touchEventNames = exports._touchEventNames = ['touchstart'];

// -----------------------------------------------------------------------------

let _setClient = exports._setClient = function ({
  x, y
}) {
  if (!_lodashFirecloud2.default.isUndefined(x)) {
    _cfg2.default.client.x = x;
    _cfg2.default.window.viewport.x = x;
  }

  if (!_lodashFirecloud2.default.isUndefined(y)) {
    _cfg2.default.client.y = y;
    _cfg2.default.window.viewport.y = y;
  }
};

let _guestimateH = exports._guestimateH = function () {
  let x = _window2.default.borderSize() / 2;
  exports._setClient({ x });
};

let _guestimateV = exports._guestimateV = function () {
  // Until the first mouse/touch event we can only guestimate.
  // A rough estimate with/out a bookmark toolbar is ~100/75px in popular browsers
  // with no developer tools, no status bar
  let heightDiff = _window2.default.height() - _client2.default.height() - _window2.default.borderSize();

  // assume border only on top i.e. no status bar (guessing this is most common)
  let y = heightDiff;

  if (heightDiff > 125) {
    // assume Developer Tools is open, and heightDiff cannot be trusted
    // assume no bookmark toolbar (guessing this is most common)
    y = 75;
  }

  exports._setClient({
    y
  });
};

let _onMouseEvent = exports._onMouseEvent = function (e) {
  if (!_lodashFirecloud2.default.isUndefined(window.mozInnerScreenX)) {
    let x = window.mozInnerScreenX;
    let y = window.mozInnerScreenY;
    exports._setClient({ x, y });
    return;
  }

  if (_lodashFirecloud2.default.isUndefined(e.clientX) || _lodashFirecloud2.default.isUndefined(e.clientY) || _lodashFirecloud2.default.isUndefined(e.screenX) || _lodashFirecloud2.default.isUndefined(e.screenY)) {
    return;
  }

  // bringing all to device pixels
  let x = _lodashFirecloud2.default.round(e.screenX * _screen2.default.osZoomFactor() - _window2.default.x() - e.clientX * _screen2.default.osZoomFactor() * _page2.default.zoomFactor());

  let y = _lodashFirecloud2.default.round(e.screenY * _screen2.default.osZoomFactor() - _window2.default.y() - e.clientY * _screen2.default.osZoomFactor() * _page2.default.zoomFactor());

  exports._setClient({ x, y });
};

let _onTouchEvent = exports._onTouchEvent = function (e) {
  // not 100% correct, but we're only interested in clientXY and screenXY
  exports._onMouseEvent(e.touches[0]);
};

// -----------------------------------------------------------------------------

let init = exports.init = function () {
  if (window !== window.top) {
    return;
  }

  _lodashFirecloud2.default.forEach(exports._mouseEventNames, function (eventName) {
    window.addEventListener(eventName, (0, _util.throttle)(exports._onMouseEvent), exports._passive);
  });

  _lodashFirecloud2.default.forEach(exports._touchEventNames, function (eventName) {
    window.addEventListener(eventName, (0, _util.throttle)(exports._onTouchEvent), exports._passive);
  });

  exports._guestimateH();
  exports._guestimateV();
};

exports.cfg = _cfg2.default;
exports.client = _client2.default;
exports.page = _page2.default;
exports.screen = _screen2.default;
exports.window = _window2.default;
exports.default = exports;

//# sourceMappingURL=index.js.map