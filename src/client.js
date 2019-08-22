import _ from 'lodash-firecloud';
import cfg from './cfg';
import screen from './screen';

import {
  roundRect,
  shouldThrottle
} from './util';

export let toJSON = function() {
  return roundRect({
    x: client.x(),
    y: client.y(),
    width: client.width(),
    height: client.height(),

    scroll: roundRect({
      x: client.scroll.x(),
      y: client.scroll.y()
    })
  });
};

// client aka visual-viewport/viewport/client-area of the top/iframe
// coordinates in device px relative to browser window
export let client = {
  x: function() {
    return _.defaultTo(cfg.client.x, 0);
  },

  y: function() {
    return _.defaultTo(cfg.client.y, 0);
  },

  width: shouldThrottle(function() {
    return window.innerWidth * screen.osZoomFactor();
  }),

  height: shouldThrottle(function() {
    return window.innerHeight * screen.osZoomFactor();
  }),

  scroll: {
    x: shouldThrottle(function() {
      return window.pageXOffset * screen.osZoomFactor();
    }),

    y: shouldThrottle(function() {
      return window.pageYOffset * screen.osZoomFactor();
    })
  },

  toJSON
};

export default client;
