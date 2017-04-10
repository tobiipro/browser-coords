/* @flow weak */

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

export let _zooms = _.map([
  -3.75,
  -3.35,
  -2.5,
  -1.65,
  -1.25,
  -0.5,
  -0.25,
  0,
  0.25,
  0.5,
  1.25,
  2.5,
  3.75,
  5,
  7.5,
  10,
  15,
  20
], function(level) {
  return 100 + 20 * level;
});

export let _guestimateZoom = function(_prevMouseE, _mouseE) {
  if (window !== window.top) {
    return;
  }

  // if (_.isUndefined(prevMouseE)) {
  //   return;
  // }

  // let exactZoom =
  //   100 *
  //   (prevMouseE.clientX - mouseE.clientX) /
  //   exports.screen.pixelRatio() /
  //   (prevMouseE.screenX - mouseE.screenX);

  let exactZoomH =
    100 *
    (window.outerWidth - client.x()) /
    client.width();

  let exactZoomV =
    100 *
    (window.outerHeight - client.y()) /
    client.height();

  let exactZoom = _.min([exactZoomH, exactZoomV]);

  let closestZoom = _.reduce(exports._zooms, function(acc, zoom) {
    let abs = Math.abs(zoom - exactZoom);
    return abs < acc.abs ? {
      abs,
      zoom
    } : acc;
  }, {
    abs: Number.MAX_VALUE,
    zoom: exports.page._zoom
  }).zoom;

  exports.page._zoom = closestZoom;
};

export let _toJSON = function() {
  return roundRect({
    x: exports.page.x(),
    y: exports.page.y(),
    width: exports.page.width(),
    height: exports.page.height(),
    url: recursiveParseUrl(window.location.href)
  });
};

// page relative to current screen
// aka layout viewport, document
export let page = {
  _zoom: 100,

  x: throttle(function() {
    return client.x() + client.scroll.x();
  }),

  y: throttle(function() {
    return client.y() + client.scroll.y();
  }),

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

  zoom: throttle(function() {
    exports._guestimateZoom();
    return exports.page._zoom;
  }),

  toJSON: exports._toJSON
};

export default page;
