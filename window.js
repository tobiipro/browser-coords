/* @flow weak */

import _ from 'lodash';
import __debug from '../../util/debug';
import client from './client';
import page from './page';

let _debug = __debug(`tobii:atex:${__filename.replace(/\//g, ':')}`);

let throttle = function(fn) {
  return _.throttle(fn, 0.1 * 1000);
};

// window relative to current screen
export let window2 = {
  _borderSize: 0,

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
  })
};

export default window2;
