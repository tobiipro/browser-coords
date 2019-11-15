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
  let interval = _.defaultTo(cfg.throttle, 0);
  let throttledFn = _.onceIn(fn, interval);
  throttledFn.now = fn;
  return throttledFn;
};

export let shouldThrottle = function(fn) {
  fn.shouldThrottle = true;
  return fn;
};

export default exports;
