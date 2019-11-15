import _ from 'lodash-firecloud';
import cfg from './cfg';

import {
  Fn
} from 'lodash-firecloud/types';

type Rect = {
  x: number;
  y: number;
  left: number;
  top: number;
  width: number;
  height: number;
}

export let roundRect = function<T extends Partial<Rect>>(obj: T, precision?: number): T {
  let keys = [
    'x',
    'y',
    'left',
    'top',
    'width',
    'height'
  ];

  _.forEach(keys, function(key) {
    if (_.isUndefined(obj[key])) {
      return;
    }
    obj[key] = _.round(obj[key], precision);
  });

  return obj;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export let throttle = function<T extends Fn>(fn: T) {
  let interval = _.defaultTo(cfg.throttle, 0);
  let throttledFn = _.throttleTrue(fn, interval);
  return throttledFn;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export let shouldThrottle = function<T extends Fn>(fn: T) {
  let shouldThrottleFn = _.assign(fn, {
    shouldThrottle: true
  });
  return shouldThrottleFn;
};
