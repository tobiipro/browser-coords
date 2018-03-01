import _ from 'lodash-firecloud';
import cfg from './cfg';
import screen from './screen';

import {
  roundRect,
  throttle
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

  width: throttle(function() {
    return window.innerWidth * screen.osZoomFactor();
  }),

  height: throttle(function() {
    return window.innerHeight * screen.osZoomFactor();
  }),

  scroll: {
    x: throttle(function() {
      return window.pageXOffset * screen.osZoomFactor();
    }),

    y: throttle(function() {
      return window.pageYOffset * screen.osZoomFactor();
    })
  },

  toJSON: exports._toJSON
};

export default client;
