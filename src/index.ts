import _ from 'lodash-firecloud';
import cfg from './cfg';
import clientCoords from './client';
import pageCoords from './page';
import screenCoords from './screen';
import screenToClientPage from './screen-to-client-page';
import windowCoords from './window';

import {
  throttle
} from './util';

import {
  Fn
} from 'lodash-firecloud/types';

declare global {
  interface Window {
    mozInnerScreenX?: number;
    mozInnerScreenY?: number;
  }
}

let _passive = {
  capture: true,
  passive: true
};

let _mouseEventNames = [
  'click',
  'dblclick',
  'mousemove',
  'wheel'
];

let _touchEventNames = [
  'touchstart'
];

// -----------------------------------------------------------------------------

let _setClient = function({x, y}: {
  x?: number;
  y?: number;
}): void {
  if (_.isDefined(x)) {
    cfg.client.x = x;
    cfg.window.viewport.x = x;
  }

  if (_.isDefined(y)) {
    cfg.client.y = y;
    cfg.window.viewport.y = y;
  }
};

let _guestimateClientX = function(): void {
  let x = windowCoords.borderSize() / 2;
  _setClient({x});
};

let _guestimateClientY = function(): void {
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

  _setClient({y});
};

let _onMouseEvent = function(e: MouseEvent | TouchEvent['touches'][0]): void {
  if (_.isDefined(window.mozInnerScreenX)) {
    let x = window.mozInnerScreenX;
    let y = window.mozInnerScreenY;
    _setClient({x, y});
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

  _setClient({x, y});
};

let _onTouchEvent = function(e: TouchEvent): void {
  // not 100% correct, but we're only interested in clientXY and screenXY
  _onMouseEvent(e.touches[0]);
};

let _maybeGuestimateClientXY = function(): void {
  // for iframes, this information needs to be guestimated via different means
  if (window !== window.top) {
    return;
  }

  // less accurate method, but doesn't require a mouse/touch event
  _guestimateClientX();
  _guestimateClientY();

  // more accurate method, requires at least one mouse/touch event
  _.forEach(_mouseEventNames, function(eventName) {
    // @ts-ignore
    window.addEventListener(
      eventName,
      throttle(_onMouseEvent),
      _passive
    );
  });

  _.forEach(_touchEventNames, function(eventName) {
    window.addEventListener(
      eventName,
      throttle(_onTouchEvent),
      _passive
    );
  });
};

let _maybeThrottle = function<T extends Fn & {
  shouldThrottle?: boolean
}>(maybeShouldThrottleFn: T): (T & _.Cancelable) | T {
  if (maybeShouldThrottleFn.shouldThrottle) {
    return throttle(maybeShouldThrottleFn);
  }

  return maybeShouldThrottleFn;
};

// -----------------------------------------------------------------------------

export let init = function(): void {
  _.forEach([
    clientCoords,
    pageCoords,
    screenCoords,
    windowCoords
  ], function(obj) {
    _.merge(obj, _.mapValuesDeep(_maybeThrottle)(obj));
  });

  _maybeGuestimateClientXY();
};

export {
  cfg,

  screenCoords as screen,
  windowCoords as window,
  clientCoords as client,
  pageCoords as page,

  screenToClientPage,
  screenToClientPage as screenToClient // backward compat
};

// export default exports;
export default {
  cfg,

  screen: screenCoords,
  window: windowCoords,
  client: clientCoords,
  page: pageCoords,

  screenToClientPage,
  screenToClient: screenToClientPage // backward compat
};
