import _ from 'lodash-firecloud';
import cfg from './cfg';

import {
  roundRect,
  shouldThrottle
} from './util';

export let toJSON = function() {
  return roundRect({
    cfg: screen.cfg,

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

// current screen
// coordinates in device px
export let screen = {
  cfg: cfg.screen,

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
      return _.get(window.screen, 'orientation.angle');
    }),

    type: shouldThrottle(function() {
      return _.get(window.screen, 'orientation.type');
    })
  },

  osZoomFactor: shouldThrottle(function() {
    if (_.isDefined(cfg.screen.osZoomFactor)) {
      return cfg.screen.osZoomFactor;
    }

    if (_.includes(navigator.appVersion, 'Win')) {
      // it's the same thing as DPI zoom (usually between 100-200%%)
      let pixelRatio = window.devicePixelRatio / cfg.page.zoomFactor;
      return _.round(pixelRatio, 2);
    }

    return 1;
  }),

  pixelRatio: shouldThrottle(function() {
    if (_.isDefined(cfg.screen.pixelRatio)) {
      return cfg.screen.pixelRatio;
    }

    let pixelRatio = window.devicePixelRatio / cfg.page.zoomFactor;
    return _.round(pixelRatio, 2);
  }),

  toJSON
};

export default screen;
