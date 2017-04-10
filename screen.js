/* @flow weak */

import _ from 'lodash';
import __debug from '../../util/debug';
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
    width: exports.screen.width(),
    height: exports.screen.height(),
    available: roundRect({
      left: exports.screen.available.left(),
      top: exports.screen.available.top(),
      width: exports.screen.available.width(),
      height: exports.screen.available.height()
    }),
    orientation: {
      angle: exports.screen.orientation.angle(),
      type: exports.screen.orientation.type()
    },
    pixelRatioPercentile: _.round(exports.screen.pixelRatio() * 100)
  });
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
  }),

  toJSON: exports._toJSON
};

export default screen;
