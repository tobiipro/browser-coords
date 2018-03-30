import _ from 'lodash-firecloud';
import cfg from './cfg';
import screen from './screen';

import {
  roundRect,
  throttle
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

  toJSON
};

export default client;
