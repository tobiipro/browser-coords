// see https://lists.w3.org/Archives/Public/www-style/2016Dec/0052.html
// see https://github.com/w3c/csswg-drafts/issues/809

import _ from 'lodash-firecloud';
import clientCoords from './client';
import pageCoords from './page';
import screenCoords from './screen';
import windowCoords from './window';

// current screen, not virtual screen
export let screenToClient = function(screenXY) {
  let {
    screenX,
    screenY
  } = screenXY;

  let pageZoomFactor = pageCoords.zoomFactor();
  let screenOsZoomFactor = screenCoords.osZoomFactor();
  let absoluteZoomFactor = pageZoomFactor * screenOsZoomFactor;

  let clientX = _.round((
    screenX -
    windowCoords.x() -
    clientCoords.x()) / absoluteZoomFactor);

  let clientY = _.round((
    screenY -
    windowCoords.y() -
    clientCoords.y()) / absoluteZoomFactor);

  _.defaults(screenXY, {
    clientX,
    clientY
  });

  return screenXY;
};

export default screenToClient;
