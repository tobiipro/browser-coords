import _ from 'lodash-firecloud';
import cfg from './cfg';

import {
  roundRect,
  throttle
} from './util';

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

    osZoomFactorPercentile: _.round(exports.screen.osZoomFactor() * 100),
    pixelRatioPercentile: _.round(exports.screen.pixelRatio() * 100)
  });
};

// current screen | in device px
export let screen = {
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

  osZoomFactor: throttle(function() {
    if (!_.isUndefined(cfg.screen.osZoomFactor)) {
      return cfg.screen.osZoomFactor;
    }

    let osZoomFactor = window.devicePixelRatio /
      (cfg.page.zoomFactor * exports.screen.pixelRatio());
    return _.round(osZoomFactor, 2);
  }),

  pixelRatio: throttle(function() {
    if (!_.isUndefined(cfg.screen.pixelRatio)) {
      return cfg.screen.pixelRatio;
    }

    if (_.includes(navigator.appVersion, 'Win')) {
      // Windows always has window.devicePixelRatio = 1 at rest
      // i.e. when page zoom is 100% and
      // OS zoom (Display Settings -> Change size...) is also 100%
      return 1;
    }

    let pixelRatio = window.devicePixelRatio / cfg.page.zoomFactor;
    return _.round(pixelRatio, 2);
  }),

  toJSON: exports._toJSON
};

export default screen;
