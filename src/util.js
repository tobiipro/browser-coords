/* eslint-disable import/prefer-default-export */

import _ from 'lodash-firecloud';
import cfg from './cfg';

export let roundRect = function(obj, precision) {
  let keys = [
    'x',
    'y',
    'left',
    'top',
    'width',
    'height'
  ];

  _.forEach(keys, function(key) {
    if (!obj[key]) {
      return;
    }
    obj[key] = _.round(obj[key], precision);
  });

  return obj;
};

export let throttle = function(fn) {
  let throttledFn = _.throttle(fn, cfg.throttle);
  throttledFn.now = fn;
  return throttledFn;
};
