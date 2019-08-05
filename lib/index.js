"use strict";Object.defineProperty(exports, "__esModule", { value: true });Object.defineProperty(exports, "cfg", { enumerable: true, get: function () {return _cfg.default;} });Object.defineProperty(exports, "client", { enumerable: true, get: function () {return _client.default;} });Object.defineProperty(exports, "page", { enumerable: true, get: function () {return _page.default;} });Object.defineProperty(exports, "screen", { enumerable: true, get: function () {return _screen.default;} });Object.defineProperty(exports, "screenToClientPage", { enumerable: true, get: function () {return _screenToClientPage.default;} });Object.defineProperty(exports, "window", { enumerable: true, get: function () {return _window.default;} });exports.default = exports.init = exports._maybeThrottle = exports._maybeGuestimateClientXY = exports._onTouchEvent = exports._onMouseEvent = exports._guestimateClientY = exports._guestimateClientX = exports._setClient = exports._touchEventNames = exports._mouseEventNames = exports._passive = void 0;var _lodashFirecloud = _interopRequireDefault(require("lodash-firecloud"));
var _cfg = _interopRequireDefault(require("./cfg"));
var _client = _interopRequireDefault(require("./client"));
var _page = _interopRequireDefault(require("./page"));
var _screen = _interopRequireDefault(require("./screen"));
var _screenToClientPage = _interopRequireDefault(require("./screen-to-client-page"));
var _window = _interopRequireDefault(require("./window"));

var _util = require("./util");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}



let _passive = {
  capture: true,
  passive: true };exports._passive = _passive;


let _mouseEventNames = [
'click',
'dblclick',
'mousemove',
'wheel'];exports._mouseEventNames = _mouseEventNames;


let _touchEventNames = [
'touchstart'];


// -----------------------------------------------------------------------------
exports._touchEventNames = _touchEventNames;
let _setClient = function ({
  x, y })
{
  if (_lodashFirecloud.default.isDefined(x)) {
    _cfg.default.client.x = x;
    _cfg.default.window.viewport.x = x;
  }

  if (_lodashFirecloud.default.isDefined(y)) {
    _cfg.default.client.y = y;
    _cfg.default.window.viewport.y = y;
  }
};exports._setClient = _setClient;

let _guestimateClientX = function () {
  let x = _window.default.borderSize() / 2;
  exports._setClient({ x });
};exports._guestimateClientX = _guestimateClientX;

let _guestimateClientY = function () {
  // Until the first mouse/touch event we can only guestimate.
  // A rough estimate with/out a bookmark toolbar is ~100/75px in popular browsers
  // with no developer tools, no status bar
  let heightDiff =
  _window.default.height() -
  _client.default.height() -
  _window.default.borderSize();

  // assume border only on top i.e. no status bar (guessing this is most common)
  let y = heightDiff;

  if (heightDiff > 125) {
    // assume Developer Tools is open, and heightDiff cannot be trusted
    // assume no bookmark toolbar (guessing this is most common)
    y = 75;
  }

  exports._setClient({ y });
};exports._guestimateClientY = _guestimateClientY;

let _onMouseEvent = function (e) {
  if (_lodashFirecloud.default.isDefined(window.mozInnerScreenX)) {
    let x = window.mozInnerScreenX;
    let y = window.mozInnerScreenY;
    exports._setClient({ x, y });
    return;
  }

  if (_lodashFirecloud.default.isUndefined(e.clientX) ||
  _lodashFirecloud.default.isUndefined(e.clientY) ||
  _lodashFirecloud.default.isUndefined(e.screenX) ||
  _lodashFirecloud.default.isUndefined(e.screenY)) {
    return;
  }

  // bringing all to device pixels
  let x = _lodashFirecloud.default.round(
  e.screenX * _screen.default.osZoomFactor() -
  _window.default.x() -
  e.clientX * _screen.default.osZoomFactor() * _page.default.zoomFactor());


  let y = _lodashFirecloud.default.round(
  e.screenY * _screen.default.osZoomFactor() -
  _window.default.y() -
  e.clientY * _screen.default.osZoomFactor() * _page.default.zoomFactor());


  exports._setClient({ x, y });
};exports._onMouseEvent = _onMouseEvent;

let _onTouchEvent = function (e) {
  // not 100% correct, but we're only interested in clientXY and screenXY
  exports._onMouseEvent(e.touches[0]);
};exports._onTouchEvent = _onTouchEvent;

let _maybeGuestimateClientXY = function () {
  // for iframes, this information needs to be guestimated via different means
  if (window !== window.top) {
    return;
  }

  // less accurate method, but doesn't require a mouse/touch event
  exports._guestimateClientX();
  exports._guestimateClientY();

  // more accurate method, requires at least one mouse/touch event
  _lodashFirecloud.default.forEach(exports._mouseEventNames, function (eventName) {
    window.addEventListener(
    eventName,
    (0, _util.throttle)(exports._onMouseEvent), exports._passive);


  });

  _lodashFirecloud.default.forEach(exports._touchEventNames, function (eventName) {
    window.addEventListener(
    eventName,
    (0, _util.throttle)(exports._onTouchEvent), exports._passive);


  });
};exports._maybeGuestimateClientXY = _maybeGuestimateClientXY;

let _maybeThrottle = function (maybeShouldThrottleFn) {
  if (maybeShouldThrottleFn.shouldThrottle) {
    return (0, _util.throttle)(maybeShouldThrottleFn);
  }

  return maybeShouldThrottleFn;
};

// -----------------------------------------------------------------------------
exports._maybeThrottle = _maybeThrottle;
let init = function () {
  _lodashFirecloud.default.forEach([
  _client.default,
  _page.default,
  _screen.default,
  _window.default],
  function (obj) {
    _lodashFirecloud.default.merge(obj, _lodashFirecloud.default.mapValuesDeep(exports._maybeThrottle)(obj));
  });

  exports._maybeGuestimateClientXY();
};exports.init = init;var _default =










exports;exports.default = _default;

//# sourceMappingURL=index.js.map