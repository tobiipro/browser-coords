import _ from 'lodash-firecloud';
import cfg from './cfg';

import {
  roundRect,
  shouldThrottle
} from './util';

export let toJSON = function() {
  return roundRect({
    width: screen.width(),
    height: screen.height(),

    available: roundRect({
      left: screen.available.left(),
      top: screen.available.top(),
      width: screen.available.width(),
      height: screen.available.height()
    }),

    orientation: {
      angle: screen.orientation.angle(),
      type: screen.orientation.type()
    },

    osZoomFactorPercentile: _.round(screen.osZoomFactor() * 100),
    pixelRatioPercentile: _.round(screen.pixelRatio() * 100)
  });
};

// current screen | in device px
export let screen = {
  width: shouldThrottle(function() {
    return window.screen.width * screen.osZoomFactor();
  }),

  height: shouldThrottle(function() {
    return window.screen.height * screen.osZoomFactor();
  }),

  available: {
    left: shouldThrottle(function() {
      return window.screen.availLeft * screen.osZoomFactor();
    }),

    top: shouldThrottle(function() {
      return window.screen.availTop * screen.osZoomFactor();
    }),

    width: shouldThrottle(function() {
      return window.screen.availWidth * screen.osZoomFactor();
    }),

    height: shouldThrottle(function() {
      return window.screen.availHeight * screen.osZoomFactor();
    })
  },

  orientation: {
    angle: shouldThrottle(function() {
      return window.screen.orientation.angle;
    }),

    type: shouldThrottle(function() {
      return window.screen.orientation.type;
    })
  },

  // Windows: it's the same thing as DPI zoom (usually between 100-200%%)
  osZoomFactor: shouldThrottle(function() {
    if (_.isDefined(cfg.screen.osZoomFactor)) {
      return cfg.screen.osZoomFactor;
    }

    let osZoomFactor = window.devicePixelRatio /
      (cfg.page.zoomFactor * screen.pixelRatio());
    return _.round(osZoomFactor, 2);
  }),

  pixelRatio: shouldThrottle(function() {
    if (_.isDefined(cfg.screen.pixelRatio)) {
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

  toJSON
};

export default screen;
