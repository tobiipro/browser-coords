import _ from 'lodash-firecloud';
import cfg from './cfg';
import client from './client';
import screen from './screen';

import {
  roundRect,
  shouldThrottle
} from './util';

export let toJSON = function() {
  return roundRect({
    x: page.x(),
    y: page.y(),
    width: page.width(),
    height: page.height(),

    zoomFactorPercentile: _.round(page.zoomFactor() * 100)
  });
};

// page relative to window (top frame) | in device px
// aka layout viewport, document
export let page = {
  x: function() {
    return client.x() - client.scroll.x();
  },

  y: function() {
    return client.y() - client.scroll.y();
  },

  width: shouldThrottle(function() {
    return _.max([ // same as jQuery(document).width
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.documentElement.clientWidth
    ]) * screen.osZoomFactor();
  }),

  height: shouldThrottle(function() {
    return _.max([ // same as jQuery(document).height
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.documentElement.clientHeight
    ]) * screen.osZoomFactor();
  }),

  zoomFactor: function() {
    return cfg.page.zoomFactor;
  },

  toJSON
};

export default page;
