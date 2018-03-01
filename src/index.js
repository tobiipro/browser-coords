import _ from 'lodash-firecloud';
import cfg from './cfg';
import clientCoords from './client';
import pageCoords from './page';
import windowCoords from './window';
import screenCoords from './screen';

import {
  throttle
} from './util';

export let _passive = {
  capture: true,
  passive: true
};

export let _mouseEventNames = [
  'click',
  'dblclick',
  'mousemove',
  'wheel'
];

export let _touchEventNames = [
  'touchstart'
];

// -----------------------------------------------------------------------------

export let _setClient = function({
  x, y
}) {
  if (!_.isUndefined(x)) {
    cfg.client.x = x;
    cfg.window.viewport.x = x;
  }

  if (!_.isUndefined(y)) {
    cfg.client.y = y;
    cfg.window.viewport.y = y;
  }
};

export let _guestimateH = function() {
  let x = windowCoords.borderSize() / 2;
  exports._setClient({x});
};

export let _guestimateV = function() {
  // Until the first mouse/touch event we can only guestimate.
  // A rough estimate with/out a bookmark toolbar is ~100/75px in popular browsers
  // with no developer tools, no status bar
  let heightDiff =
    windowCoords.height() -
    clientCoords.height() -
    windowCoords.borderSize();

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

export let _onMouseEvent = function(e) {
  if (!_.isUndefined(window.mozInnerScreenX)) {
    let x = window.mozInnerScreenX;
    let y = window.mozInnerScreenY;
    exports._setClient({x, y});
    return;
  }

  if (_.isUndefined(e.clientX) ||
    _.isUndefined(e.clientY) ||
    _.isUndefined(e.screenX) ||
    _.isUndefined(e.screenY)) {
    return;
  }

  // bringing all to device pixels
  let x = _.round(
    e.screenX * screenCoords.osZoomFactor() -
    windowCoords.x() -
    e.clientX * screenCoords.osZoomFactor() * pageCoords.zoomFactor()
  );

  let y = _.round(
    e.screenY * screenCoords.osZoomFactor() -
    windowCoords.y() -
    e.clientY * screenCoords.osZoomFactor() * pageCoords.zoomFactor()
  );

  exports._setClient({x, y});
};

export let _onTouchEvent = function(e) {
  // not 100% correct, but we're only interested in clientXY and screenXY
  exports._onMouseEvent(e.touches[0]);
};

// -----------------------------------------------------------------------------

export let init = function() {
  if (window !== window.top) {
    return;
  }

  _.forEach(exports._mouseEventNames, function(eventName) {
    window.addEventListener(
      eventName,
      throttle(exports._onMouseEvent),
      exports._passive
    );
  });

  _.forEach(exports._touchEventNames, function(eventName) {
    window.addEventListener(
      eventName,
      throttle(exports._onTouchEvent),
      exports._passive
    );
  });

  exports._guestimateH();
  exports._guestimateV();
};

export {
  cfg,
  clientCoords as client,
  pageCoords as page,
  screenCoords as screen,
  windowCoords as window
};

export default exports;
