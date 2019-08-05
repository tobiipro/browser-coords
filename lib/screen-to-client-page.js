"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.screenToClientPage = void 0;


var _lodashFirecloud = _interopRequireDefault(require("lodash-firecloud"));
var _client = _interopRequireDefault(require("./client"));
var _page = _interopRequireDefault(require("./page"));
var _screen = _interopRequireDefault(require("./screen"));
var _window = _interopRequireDefault(require("./window"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // see https://lists.w3.org/Archives/Public/www-style/2016Dec/0052.html
// see https://github.com/w3c/csswg-drafts/issues/809
// current screen, not virtual screen
let screenToClientPage = function (screenXY) {
  let {
    screenX,
    screenY } =
  screenXY;

  let pageZoomFactor = _page.default.zoomFactor();
  let screenOsZoomFactor = _screen.default.osZoomFactor();
  let absoluteZoomFactor = pageZoomFactor * screenOsZoomFactor;

  let clientX = _lodashFirecloud.default.round((
  screenX -
  _window.default.x() -
  _client.default.x()) / absoluteZoomFactor);

  let clientY = _lodashFirecloud.default.round((
  screenY -
  _window.default.y() -
  _client.default.y()) / absoluteZoomFactor);

  let pageX = clientX + _lodashFirecloud.default.round(_client.default.scroll.x() / absoluteZoomFactor);
  let pageY = clientY + _lodashFirecloud.default.round(_client.default.scroll.y() / absoluteZoomFactor);

  _lodashFirecloud.default.defaults(screenXY, {
    clientX,
    clientY,
    pageX,
    pageY });


  return screenXY;
};exports.screenToClientPage = screenToClientPage;var _default = exports.screenToClientPage;exports.default = _default;

//# sourceMappingURL=screen-to-client-page.js.map