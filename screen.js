import _ from 'lodash';
import _log from '../../log';

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
    pixelRatioPercentile: _.round(exports.screen.pixelRatio() * 100),
    osZoomFactorPercentile: _.round(exports.screen.osZoomFactor() * 100)
  });
};

// current screen | in device px
export let screen = {
  _pageZoomFactor: 1,

  width: throttle(function() {
    return window.screen.width * exports.screen.osZoomFactor();
  }),

  height: throttle(function() {
    return window.screen.height * exports.screen.osZoomFactor();
  }),

  available: {
    left: throttle(function() {
      return window.screen.availLeft * exports.screen.osZoomFactor();
    }),

    top: throttle(function() {
      return window.screen.availTop * exports.screen.osZoomFactor();
    }),

    width: throttle(function() {
      return window.screen.availWidth * exports.screen.osZoomFactor();
    }),

    height: throttle(function() {
      return window.screen.availHeight * exports.screen.osZoomFactor();
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
    return _.round(window.devicePixelRatio / exports.screen._pageZoomFactor, 2);
  }),

  osZoomFactor: throttle(function() {
    if (_.includes(navigator.appVersion, 'Win')) {
      return _.round(window.devicePixelRatio / exports.screen._pageZoomFactor, 2);
    }

    return 1;
  }),

  toJSON: exports._toJSON
};

export default screen;
