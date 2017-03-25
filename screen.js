/* @flow weak */

import _ from 'lodash';
import __debug from '../../util/debug';
import page from './page';

let _debug = __debug(`tobii:atex:${__filename.replace(/\//g, ':')}`);

let throttle = function(fn) {
  return _.throttle(fn, 0.1 * 1000);
};

// current screen
export let screen = {
  width: throttle(function() {
    return window.screen.width;
  }),

  height: throttle(function() {
    return window.screen.height;
  }),

  available: {
    left: throttle(function() {
      return window.screen.availLeft;
    }),

    top: throttle(function() {
      return window.screen.availTop;
    }),

    width: throttle(function() {
      return window.screen.availWidth;
    }),

    height: throttle(function() {
      return window.screen.availHeight;
    })
  },

  orientation: {
    angle: throttle(function() {
      return window.screen.orientation.angle;
    }),

    type: throttle(function() {
      return window.screen.orientation.type;
    })
  },

  pixelRatio: throttle(function() {
    return _.round(window.devicePixelRatio * 100 / page.zoom(), 1);
  })
};

export default screen;
