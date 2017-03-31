/* @flow weak */

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
    {
      maxWait: 1000,
      leading: true
    }
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

export let sendIframeCoords = function({
  boundingClientRect,
  iframeEl
}) {
  if (_.isUndefined(boundingClientRect)) {
    boundingClientRect = iframeEl.getBoundingClientRect();
  }

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

// -----------------------------------------------------------------------------

export let init = function() {
  if (window !== window.top) {
    window.addEventListener(
      'message',
      exports._onIframeCoordsMessageDebounced,
      {
        capture: true,
        passive: true
      }
    );
  }

  let thresholds = [0.5];
  let io = new IntersectionObserver(function(entries) {
    _.each(entries, function(entry) {
      let {
        boundingClientRect,
        target: iframeEl
      } = entry;

      if (!isIframeValid(iframeEl)) {
        return;
      }

      if (entry.intersectionRatio > thresholds[0]) {
        // iframe went inside client
        exports._inViewIframes.push(iframeEl);
        exports.sendIframeCoords({
          boundingClientRect,
          iframeEl
        });
      } else {
        // iframe went out of client
        _.pull(exports._inViewIframes, iframeEl);
      }
    });
  }, {threshold: thresholds});

  _.each(document.querySelectorAll('iframe'), function(iframeEl) {
    io.observe(iframeEl);
  });
};

export default exports;
