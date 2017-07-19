import _ from 'lodash';
import __debug from '../../util/debug';
import client from './client';

import {
  roundRect
} from '../index';

import {
  recursiveParse as recursiveParseUrl
} from '../url';

let _debug = __debug(`tobii:atex:${__filename.replace(/\//g, ':')}`);

let throttle = function(fn) {
  return _.throttle(fn, 1000);
};

export let _toJSON = function() {
  return roundRect({
    x: exports.page.x(),
    y: exports.page.y(),
    width: exports.page.width(),
    height: exports.page.height(),
    url: recursiveParseUrl(window.location.href),
    zoom: exports.page.zoom()
  });
};

// page relative to window (top frame) | in device px
// aka layout viewport, document
export let page = {
  _zoom: 100,

  x: function() {
    return client._x - client.scroll.x();
  },

  y: function() {
    return client._y - client.scroll.y();
  },

  width: throttle(function() {
    return _.max([ // same as jQuery(document).width
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.documentElement.clientWidth
    ]);
  }),

  height: throttle(function() {
    return _.max([ // same as jQuery(document).height
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.documentElement.clientHeight
    ]);
  }),

  zoom: function() {
    return exports.page._zoom;
  },

  toJSON: exports._toJSON
};

export default page;
