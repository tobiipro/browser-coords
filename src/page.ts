import _ from 'lodash-firecloud';
import cfg from './cfg';
import client from './client';
import screen from './screen';

import {
  roundRect,
  shouldThrottle
} from './util';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export let toJSON = function() {
  return roundRect({
    cfg: page.cfg,

    x: page.x(),
    y: page.y(),
    width: page.width(),
    height: page.height(),

    url: window.location.href,
    zoomFactorPercentile: _.round(page.zoomFactor() * 100)
  });
};

// page aka layout viewport, document
// coordinates in device px relative to client
export let page = {
  cfg: cfg.page,

  x: function() {
    return 0 - client.scroll.x();
  },

  y: function() {
    return 0 - client.scroll.y();
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
    return _.defaultTo(cfg.page.zoomFactor, 1);
  },

  toJSON
};

export default page;
