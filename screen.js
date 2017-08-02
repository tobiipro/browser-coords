import _ from 'lodash';
import _log from '../../log';
import page from './page';

import {
  roundRect
} from '../index';

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

// current screen | in device px
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
    return _.round(window.devicePixelRatio / page.zoomFactor(), 1);
  }),

  toJSON: exports._toJSON
};

export default screen;
