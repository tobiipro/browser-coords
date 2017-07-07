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

// page relative to window (top frame)
// aka layout viewport, document
export let page = {
  _zoom: 100,
  _x: 0,
  _y: 0,

  x: function() {
    if (window === window.top) {
      return client._x;
    }

    return exports.page._x;
  },

  y: function() {
    if (window === window.top) {
      return client._y;
    }

    return exports.page._y;
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
