import _ from 'lodash-firecloud';

let _zoomPercentiles = _.map([
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

export let guessZoomPercentile = function({
  client = {},
  osZoomFactor = 1
}) {
  if (window !== window.top) {
    return 100;
  }

  _.defaults(client, {
    x: 0,
    y: 0,
    width: window.innerWidth * osZoomFactor,
    height: window.innerHeight * osZoomFactor
  });

  let exactZoomH =
      100 *
      (window.outerWidth - client.x) /
      client.width;

  let exactZoomV =
      100 *
      (window.outerHeight - client.y) /
      client.height;

  let exactZoom = _.min([
    exactZoomH,
    exactZoomV
  ]);

  let closestZoom = _.reduce(exports._zoomPercentiles, function(acc, zoom) {
    let abs = Math.abs(zoom - exactZoom);
    return abs < acc.abs ? {
      abs,
      zoom
    } : acc;
  }, {
    abs: Number.MAX_VALUE,
    zoom: 100
  }).zoom;

  return closestZoom;
};

export default guessZoomPercentile;
