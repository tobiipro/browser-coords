// see https://lists.w3.org/Archives/Public/www-style/2016Dec/0052.html
// see https://github.com/w3c/csswg-drafts/issues/809

import _ from 'lodash-firecloud';
import clientCoords from './client';
import pageCoords from './page';
import screenCoords from './screen';
import windowCoords from './window';

type ScreenXY = {
  screenX: number;
  screenY: number;
}

type ClientPageXY = {
  clientX: number;
  clientY: number;
  pageX: number;
  pageY: number;
}

// current screen, not virtual screen
export let screenToClientPage = function({screenX, screenY}: ScreenXY): ClientPageXY {
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

  return {
    clientX,
    clientY,
    pageX: clientX + clientCoords.scroll.x(),
    pageY: clientY + clientCoords.scroll.y()
  };
};

export default screenToClientPage;
