import _ from 'lodash';
import cfg from './cfg';
import client from './client';
import screen from './screen';

import {
  roundRect,
  throttle
} from './util';

export let _toJSON = function() {
  return roundRect({
    x: exports.window2.x(),
    y: exports.window2.y(),
    width: exports.window2.width(),
    height: exports.window2.height(),

    viewport: roundRect({
      x: exports.window2.viewport.x(),
      y: exports.window2.viewport.y()
    })
  });
};

// window relative to current screen | in device px
export let window2 = {
  x: throttle(function() {
    return window.screenX * screen.osZoomFactor();
  }),

  y: throttle(function() {
    return window.screenY * screen.osZoomFactor();
  }),

  width: throttle(function() {
    return window.outerWidth * screen.osZoomFactor();
  }),

  height: throttle(function() {
    return window.outerHeight * screen.osZoomFactor();
  }),

  viewport: {
    x: function() {
      return cfg.window.viewport.x * screen.osZoomFactor();
    },

    y: function() {
      return cfg.window.viewport.y * screen.osZoomFactor();
    }
  },

  borderSize: function() {
    // assume the window bottom border is the same as the horizontal ones
    // see Window 7 window borders, or Windows 10 shadow borders
    // OSX, etc may have none
    let widthDiff =
      (exports.window2.width() - client.x()) -
      client.width();

    if (widthDiff > 25) {
      // assume Developer Tools is open vertically, and widthDiff cannot be trusted
      return 0;
    }

    // assume border on both left and right
    return _.max([0, _.floor(widthDiff / 2)]);
  },

  toJSON: exports._toJSON
};

export default window2;
