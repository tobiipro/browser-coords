import _ from 'lodash';
import cfg from './cfg';
import screen from './screen';

import {
  maybeThrottle,
  roundRect
} from './util';

export let _toJSON = function() {
  return roundRect({
    x: exports.client.x(),
    y: exports.client.y(),
    width: exports.client.width(),
    height: exports.client.height(),

    scroll: roundRect({
      x: exports.client.scroll.x(),
      y: exports.client.scroll.y()
    })
  });
};

// client relative to window | in device px
// aka visual viewport, viewport, client area
export let client = {
  x: function() {
    return cfg.client.x;
  },

  y: function() {
    return cfg.client.y;
  },

  width: maybeThrottle(function() {
    return window.innerWidth * screen.osZoomFactor();
  }),

  height: maybeThrottle(function() {
    return window.innerHeight * screen.osZoomFactor();
  }),

  scroll: {
    x: maybeThrottle(function() {
      return window.pageXOffset * screen.osZoomFactor();
    }),

    y: maybeThrottle(function() {
      return window.pageYOffset * screen.osZoomFactor();
    })
  },

  toJSON: exports._toJSON
};

export default client;
