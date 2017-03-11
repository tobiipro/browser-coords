/* @flow weak */

import 'intersection-observer';

import _ from 'lodash';
import __debug from '../../util/debug';
import client from './client';
import page from './page';
import {
  isIframeValid
} from '../../util';

let _debug = __debug(`tobii:atex:${__filename.replace(/\//g, ':')}`);

let debounce = function(fn) {
  return _.debounce(
    fn,
    0.5 * 1000,
    {maxWait: 1000, leading: true}
  );
};

export let _inViewIframes = [];

export let _onIframeCoordsMessage = function(e) {
  let msg = e.data;

  let {
    client: {
      x: clientX,
      y: clientY
    },
    zoom
  } = msg.content;

  client._x = clientX;
  client._y = clientY;
  page._zoom = zoom;
};

export let _sendIframeCoords = function({
  boundingClientRect,
  iframeEl
}) {
  let msg = {
    type: 'tobii-iframe-coords',
    content: {
      client: {
        x: client.x() + boundingClientRect.left,
        y: client.y() + boundingClientRect.top
      },
      zoom: page.zoom()
    }
  };

  iframeEl.contentWindow.postMessage(msg, '*');
};

export let _onResize = function(_e) {
  _.each(exports._inViewIframes, function(iframeEl) {
    let boundingClientRect = iframeEl.getBoundingClientRect();
    exports._sendIframeCoords({
      boundingClientRect,
      iframeEl
    });
  });
};

export let _onScroll = function(_e) {
  _.each(exports._inViewIframes, function(iframeEl) {
    let boundingClientRect = iframeEl.getBoundingClientRect();
    exports._sendIframeCoords({
      boundingClientRect,
      iframeEl
    });
  });
};

// -----------------------------------------------------------------------------

export let _onIframeCoordsMessageDebounced = (function() {
  let debouncedFn = debounce(exports._onIframeCoordsMessage);

  return function(e) {
    if (_.get(e, 'data.type') !== 'tobii-iframe-coords') {
      return;
    }
    return debouncedFn(...arguments);
  };
})();

export let _onResizeDebounced = debounce(exports._onResize);

export let _onScrollDebounced = debounce(exports._onScroll);

// -----------------------------------------------------------------------------

export let init = function() {
  if (window !== window.top) {
    window.addEventListener(
      'message',
      exports._onIframeCoordsMessageDebounced,
      {capture: true, passive: true}
    );
  }

  window.addEventListener(
    'resize',
    exports._onResizeDebounced,
    {capture: true, passive: true}
  );

  window.addEventListener(
    'scroll',
    exports._onScrollDebounced,
    {capture: true, passive: true}
  );

  let threshold = [0.5];
  let io = new IntersectionObserver(function(entries) {
    _.each(entries, function(entry) {
      let {
        boundingClientRect,
        target: iframeEl
      } = entry;

      if (entry.intersectionRatio > threshold[0]) {
        // iframe went inside client
        exports._inViewIframes.push(iframeEl);
        exports._sendIframeCoords({
          boundingClientRect,
          iframeEl
        });
      } else {
        // iframe went out of client
        _.pull(exports._inViewIframes, iframeEl);
      }
    });
  }, {
    threshold
  });

  _.each(document.querySelectorAll('iframe'), function(iframeEl) {
    if (!isIframeValid(iframeEl)) {
      return;
    }

    io.observe(iframeEl);
  });
};

export default exports;
