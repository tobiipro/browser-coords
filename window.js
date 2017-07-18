import _ from 'lodash';
import __debug from '../../util/debug';
import client from './client';
import page from './page';

import {
  roundRect
} from '../index';

let _debug = __debug(`tobii:atex:${__filename.replace(/\//g, ':')}`);

let throttle = function(fn) {
  return _.throttle(fn, 1000);
};

export let _toJSON = function() {
  return roundRect({
    x: exports.window2.x(),
    y: exports.window2.y(),
    width: exports.window2.width(),
    height: exports.window2.height(),
    viewport: {
      x: exports.window2.viewport.x(),
      y: exports.window2.viewport.y()
    }
  });
};

// window relative to current screen | in device px
export let window2 = {
  _borderSize: 0,
  _viewportX: 0,
  _viewportY: 0,

  x: throttle(function() {
    return window.screenX;
  }),

  y: throttle(function() {
    return window.screenY;
  }),

  width: throttle(function() {
    return window.outerWidth;
  }),

  height: throttle(function() {
    return window.outerHeight;
  }),

  viewport: {
    x: function() {
      if (window === window.top) {
        return client._x;
      }

      return exports.window2._viewportX;
    },

    y: function() {
      if (window === window.top) {
        return client._y;
      }

      return exports.window2._viewportY;
    }
  },

  borderSize: throttle(function() {
    // assume the window bottom border is the same as the horizontal ones
    // see Window 7 window borders, or Windows 10 shadow borders
    // OSX, etc may have none
    let widthDiff =
      (exports.window2.width() - client.x()) -
      client.width() * page.zoom() / 100;

    if (widthDiff > 25) {
      // assume Developer Tools is open vertically, and widthDiff cannot be trusted
      return 0;
    }

    // assume border on both left and right
    return _.max([0, _.floor(widthDiff / 2)]);
  }),

  toJSON: exports._toJSON
};

export default window2;
