/* @flow weak */

import _ from 'lodash';
import __debug from '../../util/debug';

import {
  roundRect
} from '../index';

let _debug = __debug(`tobii:atex:${__filename.replace(/\//g, ':')}`);

let throttle = function(fn) {
  return _.throttle(fn, 0.1 * 1000);
};

export let _toJSON = function() {
  return roundRect({
    x: exports.client.x(),
    y: exports.client.y(),
    width: exports.client.width(),
    height: exports.client.height(),
    scroll: roundRect({
      x: exports.client.scroll.x(),
      y: exports.client.scroll.y()
    })
  });
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
  },

  toJSON: exports._toJSON
};

export default client;
