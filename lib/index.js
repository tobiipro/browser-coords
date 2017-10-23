'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.screen = exports.window = exports.client = exports.page = exports.cfg = exports.toJSON = exports.throttle = exports.init = exports._onTouchEvent = exports._onMouseEvent = exports._guestimateV = exports._guestimateH = exports._setClient = exports._touchEventNames = exports._mouseEventNames = exports._passive = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _cfg = require('./cfg');

var _cfg2 = _interopRequireDefault(_cfg);

var _client = require('./client');

var _client2 = _interopRequireDefault(_client);

var _page = require('./page');

var _page2 = _interopRequireDefault(_page);

var _screen = require('./screen');

var _screen2 = _interopRequireDefault(_screen);

var _window = require('./window');

var _window2 = _interopRequireDefault(_window);

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
  if (!_lodash2.default.isUndefined(x)) {
    _cfg2.default.client.x = x;
    _cfg2.default.window.viewport.x = x;
  }

  if (!_lodash2.default.isUndefined(y)) {
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
  if (!_lodash2.default.isUndefined(window.mozInnerScreenX)) {
    let x = window.mozInnerScreenX;
    let y = window.mozInnerScreenY;
    exports._setClient({ x, y });
    return;
  }

  if (_lodash2.default.isUndefined(e.clientX) || _lodash2.default.isUndefined(e.clientY) || _lodash2.default.isUndefined(e.screenX) || _lodash2.default.isUndefined(e.screenY)) {
    return;
  }

  // bringing all to device pixels
  let x = _lodash2.default.round(e.screenX * _screen2.default.osZoomFactor() - _window2.default.x() - e.clientX * _screen2.default.osZoomFactor() * _page2.default.zoomFactor());

  let y = _lodash2.default.round(e.screenY * _screen2.default.osZoomFactor() - _window2.default.y() - e.clientY * _screen2.default.osZoomFactor() * _page2.default.zoomFactor());

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

  _lodash2.default.forEach(exports._mouseEventNames, function (eventName) {
    window.addEventListener(eventName, _lodash2.default.throttle(exports._onMouseEvent, 1000), exports._passive);
  });

  _lodash2.default.forEach(exports._touchEventNames, function (eventName) {
    window.addEventListener(eventName, _lodash2.default.throttle(exports._onTouchEvent, 1000), exports._passive);
  });

  exports._guestimateH();
  exports._guestimateV();
};

let throttle = exports.throttle = function (wait) {
  let throttled = _lodash2.default.omit(_lodash2.default.cloneDeep(exports), ['throttle']);

  throttled = (0, _util.throttleDeeply)(throttled, wait);
  return throttled;
};

let toJSON = exports.toJSON = function () {
  return {
    page: _page2.default.toJSON(),
    client: _client2.default.toJSON(),
    window: _window2.default.toJSON(),
    screen: _screen2.default.toJSON()
  };
};

exports.cfg = _cfg2.default;
exports.page = _page2.default;
exports.client = _client2.default;
exports.window = _window2.default;
exports.screen = _screen2.default;
exports.default = exports;

//# sourceMappingURL=index.js.map