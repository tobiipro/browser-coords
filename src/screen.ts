import _ from 'lodash-firecloud';
import cfg from './cfg';

import {
  roundRect,
  shouldThrottle
} from './util';

declare global {
  interface Screen {
    availLeft?: number;
    availTop?: number;
  }
}

// NOTE function taken out of the 'screen' variable assignment to assist typescript into inferring types
export let getOsZoomFactor = function(): number {
  if (_.isDefined(cfg.screen.osZoomFactor)) {
    return cfg.screen.osZoomFactor;
  }

  if (_.includes(navigator.appVersion, 'Win')) {
    // it's the same thing as DPI zoom (usually between 100-200%%)

    // not using pageCoords.zoomFactor() to avoid circular dependency
    let pageZoomFactor = _.defaultTo(cfg.page.zoomFactor, 1);
    let pixelRatio = window.devicePixelRatio / pageZoomFactor;
    return _.round(pixelRatio, 2);
  }

  return 1;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
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
    return window.screen.width * getOsZoomFactor();
  }),

  height: shouldThrottle(function() {
    return window.screen.height * getOsZoomFactor();
  }),

  available: {
    left: shouldThrottle(function() {
      return window.screen.availLeft * getOsZoomFactor();
    }),

    top: shouldThrottle(function() {
      return window.screen.availTop * getOsZoomFactor();
    }),

    width: shouldThrottle(function() {
      return window.screen.availWidth * getOsZoomFactor();
    }),

    height: shouldThrottle(function() {
      return window.screen.availHeight * getOsZoomFactor();
    })
  },

  orientation: {
    angle: shouldThrottle(function() {
      return _.get(window.screen, 'orientation.angle') as Window['screen']['orientation']['angle'];
    }),

    type: shouldThrottle(function() {
      return _.get(window.screen, 'orientation.type') as Window['screen']['orientation']['type'];
    })
  },

  osZoomFactor: shouldThrottle(function() {
    return getOsZoomFactor();
  }),

  pixelRatio: shouldThrottle(function() {
    if (_.isDefined(cfg.screen.pixelRatio)) {
      return cfg.screen.pixelRatio;
    }

    // not using pageCoords.zoomFactor() to avoid circular dependency
    let pageZoomFactor = _.defaultTo(cfg.page.zoomFactor, 1);
    let pixelRatio = window.devicePixelRatio / pageZoomFactor;
    return _.round(pixelRatio, 2);
  }),

  toJSON
};

export default screen;
