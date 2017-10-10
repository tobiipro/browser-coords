/* eslint-disable import/prefer-default-export */

import _ from 'lodash';

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

export let maybeThrottle = function(fn) {
  fn.maybeThrottle = true;
  return fn;
};

let deeply = function(fn) {
  return function(obj, iteratee) {
    return _.mapValues(obj, function(v, _name) {
      return _.isPlainObject(v) ? deeply(fn)(v, iteratee) : fn(v, iteratee);
    });
  };
};

export let throttleDeeply = function(obj, wait) {
  return exports.deeply(function(fn) {
    if (!_.isFunction(fn) || !fn.maybeThrottle) {
      return fn;
    }

    return _.throttle(fn, wait);
  })(obj);
};
