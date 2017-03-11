/* @flow weak */

import _ from 'lodash';
import __debug from '../../util/debug';

let _debug = __debug(`tobii:atex:${__filename.replace(/\//g, ':')}`);

let throttle = function(fn) {
  return _.throttle(fn, 0.1 * 1000);
};

// client relative to window
// aka visual viewport, viewport, client area
export let client = {
  _x: 0,
  _y: 0,

  x: throttle(function() {
    return exports.client._x;
  }),

  y: throttle(function() {
    return exports.client._y;
  }),

  width: throttle(function() {
    return window.innerWidth;
  }),

  height: throttle(function() {
    return window.innerHeight;
  }),

  scroll: {
    x: throttle(function() {
      return window.pageXOffset;
    }),

    y: throttle(function() {
      return window.pageYOffset;
    })
  }
};

export default client;
